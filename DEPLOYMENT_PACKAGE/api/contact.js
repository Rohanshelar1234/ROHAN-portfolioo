const nodemailer = require('nodemailer');

// Email configuration
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

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and message are required' 
      });
    }
    
    // Send email
    const emailText = `📬 New contact form submission!\n\n👤 Name: ${name}\n💬 Message: ${message}\n⏰ Time: ${new Date().toLocaleString()}\n🌐 Source: Vercel Deployment`;
    
    await transporter.sendMail({
      from: `"Rohan Shelar Portfolio" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: '📧 Contact Form Submission - Rohan Shelar Portfolio',
      text: emailText,
      replyTo: GMAIL_USER
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
};
