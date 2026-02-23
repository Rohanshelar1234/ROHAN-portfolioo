const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Email configuration
// ADD YOUR GMAIL HERE
const GMAIL_USER = 'your-email@gmail.com';
// ADD YOUR APP PASSWORD HERE
const GMAIL_PASS = 'your-app-password';

// Skip email configuration if not set up
const emailConfigured = GMAIL_USER !== 'your-email@gmail.com' && GMAIL_PASS !== 'your-app-password';

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
});

// Function to send email with error handling
async function sendEmail(subject, text) {
  // Skip sending if email not configured
  if (!emailConfigured) {
    console.log('Email not configured - skipping email send');
    return;
  }
  
  try {
    const mailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: subject,
      text: text
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error.message);
    // App continues running even if email fails
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
    console.error('Error updating visitor count:', error.message);
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
    console.error('Error getting visitor count:', error.message);
    return 0;
  }
}

// Routes
app.get('/', (req, res) => {
  try {
    // Get visitor information
    const visitorIP = req.ip || req.connection.remoteAddress || 'Unknown';
    const userAgent = req.get('User-Agent') || 'Unknown';
    const visitTime = new Date().toLocaleString();
    
    // Update visitor count
    const newCount = updateVisitorCount();
    
    // Send email notification about new visitor
    const emailText = `New visitor detected!\n\nVisitor Count: ${newCount}\nIP Address: ${visitorIP}\nBrowser: ${userAgent}\nVisit Time: ${visitTime}`;
    sendEmail('New Visitor - Rohan Shelar Portfolio', emailText);
    
    // Send HTML file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (error) {
    console.error('Error in home route:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to get visitor count
app.get('/api/visitors', (req, res) => {
  try {
    const count = getVisitorCount();
    res.json({ count: count });
  } catch (error) {
    console.error('Error getting visitor count:', error.message);
    res.json({ count: 0 });
  }
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required' });
    }
    
    // Send email notification
    const emailText = `New contact form submission!\n\nName: ${name}\nMessage: ${message}\nTime: ${new Date().toLocaleString()}`;
    sendEmail('Contact Form Submission - Rohan Shelar Portfolio', emailText);
    
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error handling contact form:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to view the portfolio`);
});
