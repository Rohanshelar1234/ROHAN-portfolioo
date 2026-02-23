# Rohan Shelar Portfolio

A professional personal portfolio web app built with Node.js and Express, featuring a modern dark UI with glassmorphism effects, animated particle background, and email notifications.

## Features

- **Full Screen Intro Loader** - Smooth loading animation that fades after 2.5 seconds
- **Dark Modern UI** - Glassmorphism design with animated particle background
- **Typing Animation** - Cycles through welcome messages
- **Visitor Tracking** - Counts and tracks visitors with email notifications
- **Contact Form** - Functional contact form with email delivery
- **Responsive Design** - Works perfectly on all devices
- **Error Handling** - Robust error handling prevents crashes

## Project Structure

```
/project-root
├── server.js              # Express server with email functionality
├── package.json           # Dependencies and scripts
├── visitors.json          # Visitor count storage
├── README.md              # This file
└── /public
    ├── index.html         # Main HTML file
    ├── style.css          # Styling with glassmorphism effects
    └── script.js          # Frontend JavaScript functionality
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings
Edit `server.js` and update these lines with your Gmail credentials:

```javascript
// ADD YOUR GMAIL HERE
const GMAIL_USER = 'your-email@gmail.com';
// ADD YOUR APP PASSWORD HERE
const GMAIL_PASS = 'your-app-password';
```

**Important:** You need to:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password from Google Account settings
3. Use the App Password (not your regular password)

### 3. Run the Application
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

### 4. Access the Portfolio
Open your browser and navigate to:
- Local: `http://localhost:3000`
- Replit: Will be available at your Replit URL

## Environment Variables

The app uses `process.env.PORT || 3000` for the port, making it compatible with:
- Replit (uses assigned port automatically)
- Heroku (uses PORT environment variable)
- Local development (defaults to 3000)

## Features Explained

### Visitor Tracking
- Automatically captures visitor IP address and browser information
- Increments visitor count on each page load
- Sends email notification when someone visits
- Stores count in `visitors.json`

### Email Notifications
The app sends emails for:
1. **New Visitors** - When someone opens the site
2. **Contact Form Submissions** - When someone sends a message

All email operations are wrapped in try-catch blocks to prevent crashes if email fails.

### Frontend Features
- **Particle Background**: Animated canvas particles with connection lines
- **Typing Animation**: Cycles through "Hi, I'm Rohan Shelar", "Welcome to my page", "Let's connect on Instagram"
- **Glassmorphism Card**: Modern frosted glass effect
- **Interactive Elements**: Hover effects and smooth transitions
- **Form Validation**: Client-side and server-side validation

## Deployment

### Replit
1. Upload all files to Replit
2. Configure environment variables if needed
3. Click "Run" - Replit will automatically install dependencies and start the server

### Other Hosting
The app works on any Node.js hosting platform that supports:
- Node.js 14+ 
- npm package installation
- Environment variables

## Security Notes

- Never commit your Gmail credentials to version control
- Use environment variables for production deployment
- The app includes basic input validation and error handling
- All file operations are wrapped in try-catch blocks

## Troubleshooting

### Email Not Working
1. Check Gmail App Password is correct
2. Ensure 2-factor authentication is enabled
3. Verify "Less secure app access" is not needed (use App Password instead)

### Server Crashes
- All operations are wrapped in try-catch blocks
- Check console logs for specific error messages
- Ensure all dependencies are installed correctly

### Visitor Count Not Updating
- Check `visitors.json` file permissions
- Ensure the file exists and is writable
- Check server logs for any file system errors

## Technologies Used

- **Backend**: Node.js, Express.js
- **Email**: Nodemailer with Gmail SMTP
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, Glassmorphism
- **Animations**: CSS Animations, Canvas API
- **Fonts**: Google Fonts (Inter)

## License

MIT License - Feel free to use this for your own portfolio projects!
