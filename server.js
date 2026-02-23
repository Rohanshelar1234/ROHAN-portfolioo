// Load environment variables
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added for form data
app.use(express.static('public'));

// Email configuration using environment variables
const GMAIL_USER = process.env.GMAIL_USER || 'your-email@gmail.com';
const GMAIL_PASS = process.env.GMAIL_PASS || 'your-app-password';

// Check if email is properly configured
const emailConfigured = GMAIL_USER !== 'your-email@gmail.com' && GMAIL_PASS !== 'your-app-password';

// Create email transporter with proper Gmail settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});

// Verify transporter connection on startup
async function verifyEmailConnection() {
  if (!emailConfigured) {
    console.log('⚠️  Email not configured - emails will be skipped');
    console.log('📧 To configure: Set GMAIL_USER and GMAIL_PASS environment variables');
    return;
  }
  
  try {
    await transporter.verify();
    console.log('✅ Email transporter connected successfully');
  } catch (error) {
    console.error('❌ Email transporter connection failed:', error.message);
    console.log('🔧 Check your Gmail App Password and account settings');
  }
}

// Function to send email with enhanced error handling
async function sendEmail(subject, text) {
  // Skip sending if email not configured
  if (!emailConfigured) {
    console.log('⚠️  Email not configured - skipping email send');
    console.log(`📧 Would send: ${subject}`);
    return { success: false, reason: 'Email not configured' };
  }
  
  try {
    console.log('📧 Sending email...');
    console.log(`📧 Subject: ${subject}`);
    
    const mailOptions = {
      from: `"Rohan Shelar Portfolio" <${GMAIL_USER}>`, // Proper from field
      to: GMAIL_USER,
      subject: subject,
      text: text,
      replyTo: GMAIL_USER
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    console.error('🔧 Full error details:', error);
    
    // Specific Gmail error handling
    if (error.code === 'EAUTH') {
      console.error('🔧 Authentication failed - Check your Gmail App Password');
      console.error('🔧 Make sure 2-factor authentication is enabled');
    } else if (error.code === 'ECONNECTION') {
      console.error('🔧 Connection failed - Check internet connection');
    }
    
    return { success: false, error: error.message };
  }
}

// Function to update visitor count
function updateVisitorCount() {
  try {
    let visitorsData = { count: 0, visitors: [] };
    
    // Read existing data
    if (fs.existsSync('visitors.json')) {
      const data = fs.readFileSync('visitors.json', 'utf8');
      visitorsData = JSON.parse(data);
    }
    
    // Increment count
    visitorsData.count += 1;
    
    // Save updated data
    fs.writeFileSync('visitors.json', JSON.stringify(visitorsData, null, 2));
    
    return visitorsData.count;
  } catch (error) {
    console.error('❌ Error updating visitor count:', error.message);
    return 0;
  }
}

// Function to get visitor count
function getVisitorCount() {
  try {
    if (fs.existsSync('visitors.json')) {
      const data = fs.readFileSync('visitors.json', 'utf8');
      const visitorsData = JSON.parse(data);
      return visitorsData.count;
    }
    return 0;
  } catch (error) {
    console.error('❌ Error getting visitor count:', error.message);
    return 0;
  }
}

// Routes
app.get('/', (req, res) => {
  try {
    // Get visitor information
    const visitorIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'Unknown';
    const userAgent = req.get('User-Agent') || 'Unknown';
    const visitTime = new Date().toLocaleString();
    
    // Update visitor count
    const newCount = updateVisitorCount();
    
    // Send email notification about new visitor (async, don't wait)
    const emailText = `🚀 New visitor detected!\n\n📊 Visitor Count: ${newCount}\n🌐 IP Address: ${visitorIP}\n💻 Browser: ${userAgent}\n⏰ Visit Time: ${visitTime}`;
    sendEmail('👋 New Visitor - Rohan Shelar Portfolio', emailText);
    
    // Send HTML file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (error) {
    console.error('❌ Error in home route:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to get visitor count
app.get('/api/visitors', (req, res) => {
  try {
    const count = getVisitorCount();
    res.json({ count: count });
  } catch (error) {
    console.error('❌ Error getting visitor count:', error.message);
    res.json({ count: 0 });
  }
});

// Handle contact form submission - FIXED ENDPOINT
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📝 Contact form submission received');
    console.log('📝 Request body:', req.body);
    
    const { name, message } = req.body;
    
    if (!name || !message) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Name and message are required' 
      });
    }
    
    // Send email notification
    const emailText = `📬 New contact form submission!\n\n👤 Name: ${name}\n💬 Message: ${message}\n⏰ Time: ${new Date().toLocaleString()}\n🌐 IP: ${req.ip || req.headers['x-forwarded-for'] || 'Unknown'}`;
    
    const emailResult = await sendEmail('📧 Contact Form Submission - Rohan Shelar Portfolio', emailText);
    
    if (emailResult.success) {
      console.log('✅ Contact form processed successfully');
      res.json({ 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
    } else {
      console.log('⚠️  Contact form processed but email failed');
      res.json({ 
        success: true, 
        message: 'Message received! (Email notification failed, but I got your message)' 
      });
    }
  } catch (error) {
    console.error('❌ Error handling contact form:', error.message);
    console.error('❌ Full error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    emailConfigured: emailConfigured,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} to view the portfolio`);
  console.log(`📧 Email configured: ${emailConfigured ? 'Yes' : 'No'}`);
  
  // Verify email connection on startup
  await verifyEmailConnection();
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Server shutting down gracefully...');
  transporter.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  transporter.close();
  process.exit(0);
});
