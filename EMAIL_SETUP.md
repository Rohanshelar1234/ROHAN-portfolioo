# 📧 Email Setup Guide for Rohan Shelar Portfolio

## 🔍 What Was Fixed:

### ❌ Previous Issues:
1. **Missing environment variables** - Hardcoded credentials
2. **Incomplete Gmail configuration** - Missing proper SMTP settings
3. **Poor error handling** - No detailed error messages
4. **Missing form middleware** - `express.urlencoded` not included
5. **No email verification** - Couldn't test if Gmail works

### ✅ Fixed Issues:
1. **Environment variables** - Uses `process.env.GMAIL_USER` and `process.env.GMAIL_PASS`
2. **Complete Gmail settings** - Proper SMTP with SSL/TLS
3. **Enhanced error handling** - Detailed console logs with emojis
4. **Form middleware** - Added `express.urlencoded({ extended: true })`
5. **Email verification** - Tests connection on startup
6. **Health check endpoint** - `/api/health` to test status

## 🛠️ Setup Instructions:

### Step 1: Create `.env` file
Create a file named `.env` in your project root:

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Get Gmail App Password
1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to: https://myaccount.google.com/apppasswords
3. Select "Mail" for the app and "Other (Custom name)" for device
4. Name it "Portfolio App"
5. Copy the 16-character password

### Step 3: Update `.env` file
```env
# Your Gmail address
GMAIL_USER=your-actual-email@gmail.com

# Your Gmail App Password (16 characters)
GMAIL_PASS=xxxx-xxxx-xxxx-xxxx

# Port (optional)
PORT=3000
```

### Step 4: Restart Server
```bash
# Stop current server (Ctrl+C)
# Start again
npm start
```

### Step 5: Verify Setup
You should see:
```
🚀 Server is running on port 3000
🌐 Open http://localhost:3000 to view the portfolio
📧 Email configured: Yes
✅ Email transporter connected successfully
```

## 🧪 Test Email Functionality:

### Method 1: Health Check
Open: `http://localhost:3000/api/health`
```json
{
  "status": "OK",
  "emailConfigured": true,
  "timestamp": "2024-02-23T..."
}
```

### Method 2: Submit Contact Form
1. Open `http://localhost:3000`
2. Fill out the contact form
3. Check console for detailed logs

### Method 3: Visit the Site
Each visit will trigger a visitor email (if configured)

## 🔧 Troubleshooting:

### ❌ "Email not configured"
- Check `.env` file exists
- Verify `GMAIL_USER` and `GMAIL_PASS` are set correctly
- Restart server after changing `.env`

### ❌ "Authentication failed"
- Make sure 2-factor authentication is enabled
- Use App Password, NOT regular password
- App Password is 16 characters with dashes

### ❌ "Connection failed"
- Check internet connection
- Verify Gmail credentials
- Try restarting server

### ❌ No email received
- Check Spam folder
- Verify "From" email matches Gmail address
- Check console for error messages

## 🚀 For Replit Deployment:

1. **Add Environment Variables in Replit:**
   - Go to Secrets (lock icon)
   - Add: `GMAIL_USER` = your-email@gmail.com
   - Add: `GMAIL_PASS` = your-app-password

2. **Update `.replit` file:**
```toml
[run]
command = "npm start"
```

## 📊 Console Logs Explained:

- 🚀 Server startup
- 📧 Email operations
- ✅ Success messages
- ❌ Error messages
- ⚠️ Warnings
- 🔧 Troubleshooting tips
- 📝 Form submissions
- 🌐 Visitor tracking

## 🔄 Server Status:

Current server is running with:
- ✅ Enhanced error handling
- ✅ Environment variable support
- ✅ Proper Gmail configuration
- ✅ Detailed logging
- ✅ Health check endpoint
- ⚠️ Email not configured (needs setup)

**Your portfolio is ready! Just configure the email credentials.**
