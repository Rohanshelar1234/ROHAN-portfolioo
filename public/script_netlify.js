// Portfolio JavaScript for Netlify Deployment
document.addEventListener('DOMContentLoaded', function() {
    // Simple visitor counter
    let count = localStorage.getItem('visitorCount') || 1;
    if (!sessionStorage.getItem('visited')) {
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);
        sessionStorage.setItem('visited', 'true');
    }
    document.getElementById('visitorCount').textContent = count;

    // Contact form with Netlify Functions
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
            // Send to Netlify Function
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showFormMessage(data.message, 'success');
                contactForm.reset();
            } else {
                showFormMessage(data.message || 'Failed to send message', 'error');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showFormMessage('Network error. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span>';
        }
    });
    
    // Form message functions
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideFormMessage();
        }, 5000);
    }
    
    function hideFormMessage() {
        formMessage.style.display = 'none';
    }
});
