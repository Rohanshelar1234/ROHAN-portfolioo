const nodemailer = require('nodemailer');

// Email configuration using environment variables
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

// Create email transporter with better configuration
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
  },
  debug: true,
  logger: true
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
    // Parse request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid request format' 
        })
      };
    }

    const { name, message } = requestBody;
    
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

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email service connection failed' 
        })
      };
    }

    // Send email
    const emailText = `📬 New contact form submission!\n\n👤 Name: ${name}\n💬 Message: ${message}\n⏰ Time: ${new Date().toLocaleString()}\n🌐 Source: Netlify Deployment`;
    
    const mailOptions = {
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
    };

    console.log('Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });

  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Return specific error messages based on error type
    let errorMessage = 'Failed to send message. Please try again.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Check Gmail credentials.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Email service connection failed. Please try again.';
    } else if (error.code === 'EMESSAGE') {
      errorMessage = 'Invalid email format. Please check configuration.';
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: errorMessage,
        error: error.message 
      })
    };
  }
};
