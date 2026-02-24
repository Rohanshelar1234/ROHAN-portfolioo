// Portfolio JavaScript for Netlify Deployment with Fallback
document.addEventListener('DOMContentLoaded', function() {
    // Simple visitor counter
    let count = localStorage.getItem('visitorCount') || 1;
    if (!sessionStorage.getItem('visited')) {
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);
        sessionStorage.setItem('visited', 'true');
    }
    document.getElementById('visitorCount').textContent = count;

    // Contact form with Netlify Functions and Fallback
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous messages
        hideFormMessage();
        
        // Validate inputs
        if (!name || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        try {
            // Try primary contact function first
            let response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message })
            });
            
            let data = await response.json();
            
            // If primary fails, try fallback
            if (!data.success && response.status >= 500) {
                console.log('Primary function failed, trying fallback...');
                response = await fetch('/.netlify/functions/contact-fallback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, message })
                });
                
                data = await response.json();
            }
            
            if (data.success) {
                showFormMessage(data.message, 'success');
                contactForm.reset();
            } else {
                // If both fail, try mailto fallback
                showFormMessage('Trying alternative method...', 'error');
                setTimeout(() => {
                    const subject = encodeURIComponent(`Contact from ${name}`);
                    const body = encodeURIComponent(`Name: ${name}\n\nMessage: ${message}\n\nSent from portfolio`);
                    window.location.href = `mailto:rohanshelar277@gmail.com?subject=${subject}&body=${body}`;
                }, 1500);
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Network error - try mailto fallback
            showFormMessage('Opening email client...', 'error');
            setTimeout(() => {
                const subject = encodeURIComponent(`Contact from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\n\nMessage: ${message}\n\nSent from portfolio`);
                window.location.href = `mailto:rohanshelar277@gmail.com?subject=${subject}&body=${body}`;
            }, 1500);
        } finally {
            // Re-enable submit button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span>';
            }, 3000);
        }
    });
    
    // Form message functions
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds for success, 8 seconds for error
        const timeout = type === 'success' ? 5000 : 8000;
        setTimeout(() => {
            hideFormMessage();
        }, timeout);
    }
    
    function hideFormMessage() {
        formMessage.style.display = 'none';
    }
});
