const nodemailer = require('nodemailer');

// Try multiple sources for Gmail credentials
const GMAIL_CREDENTIALS = process.env.GMAIL_CREDENTIALS || 
                          process.env.GMAIL_USER + ':' + process.env.GMAIL_PASS;

// Parse combined credentials
const [GMAIL_USER, GMAIL_PASS] = GMAIL_CREDENTIALS ? GMAIL_CREDENTIALS.split(':') : [null, null];

// Create email transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event, context) => {
  // Enable CORS for all requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    const { name, message } = JSON.parse(event.body);
    
    // Validate inputs
    if (!name || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Name and message are required' 
        })
      };
    }

    // Check email configuration
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('Email configuration missing');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email service not configured' 
        })
      };
    }

    // Send email
    const emailText = `📬 New contact form submission!\n\n👤 Name: ${name}\n💬 Message: ${message}\n⏰ Time: ${new Date().toLocaleString()}\n🌐 Source: Netlify Deployment`;
    
    await transporter.sendMail({
      from: `"Rohan Shelar Portfolio" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: '📧 Contact Form Submission - Rohan Shelar Portfolio',
      text: emailText,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff;">📬 New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>💬 Message:</strong></p>
            <p style="background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #00d4ff;">${message}</p>
            <p><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>🌐 Source:</strong> Netlify Deployment</p>
          </div>
        </div>
      `
    });
    
    console.log('Email sent successfully from:', name);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });

  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send message. Please try again.' 
      })
    };
  }
};
