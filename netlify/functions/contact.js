const nodemailer = require('nodemailer');

// Email configuration using environment variables
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    const { name, message } = JSON.parse(event.body);
    
    if (!name || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Name and message are required' 
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
      replyTo: GMAIL_USER
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      })
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send message. Please try again.' 
      })
    };
  }
};
