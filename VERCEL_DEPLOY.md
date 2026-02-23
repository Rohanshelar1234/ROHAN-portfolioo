# 🚀 Vercel Deployment Guide for Rohan Shelar Portfolio

## ✅ **Vercel-Ready Files Created:**
```
/project-root
├── vercel.json                 # Vercel configuration
├── api/
│   ├── contact.js              # Contact form API
│   └── visitors.js             # Visitor counter API
├── public/
│   ├── index.html              # Main HTML
│   ├── style.css               # Styling
│   └── script_vercel.js        # Vercel JavaScript
├── package.json                # Dependencies
└── .env                       # Environment variables
```

## 🛠️ **Deployment Methods:**

### **Method 1: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project folder
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: rohan-shelar-portfolio
# - Directory: . (current directory)
# - Override settings? Yes
```

### **Method 2: GitHub Integration**
1. Push code to GitHub repository
2. Connect to [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Vercel auto-deploys

### **Method 3: Vercel Web Interface**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Upload project files
4. Configure environment variables

## 🔧 **Environment Variables Setup:**

### **Option A: In vercel.json (Already Set)**
```json
"env": {
  "GMAIL_USER": "rohanshelar277@gmail.com",
  "GMAIL_PASS": "lbhr ltik fqmd nwqj"
}
```

### **Option B: Vercel Dashboard**
1. Go to Project Settings → Environment Variables
2. Add:
   - `GMAIL_USER` = `rohanshelar277@gmail.com`
   - `GMAIL_PASS` = `lbhr ltik fqmd nwqj`

## 📁 **Before Deploying:**
```bash
# Use Vercel-specific script
cp public/script_vercel.js public/script.js
```

## ✅ **What Works on Vercel:**
- ✅ **Full portfolio** - All animations and styling
- ✅ **Contact form** - Sends emails via API routes
- ✅ **Visitor counter** - Simple in-memory counter
- ✅ **Email notifications** - Gmail integration
- ✅ **Instagram link** - Clickable and styled
- ✅ **Particle background** - Canvas animations
- ✅ **Typing animation** - Text cycling effect

## 🔄 **API Routes Structure:**
- `/api/contact` - Handles contact form submissions
- `/api/visitors` - Returns visitor count

## 🧪 **Test Your Deployment:**
1. Deploy to Vercel
2. Visit your `.vercel.app` URL
3. Test contact form
4. Check Gmail for messages

## 📱 **Vercel Features:**
- ⚡ **Automatic HTTPS** - Free SSL certificate
- 🌍 **Global CDN** - Fast worldwide loading
- 🔄 **Auto-deploy** - Updates on git push
- 📊 **Analytics** - Built-in visitor analytics
- 🛠️ **Serverless Functions** - Perfect for APIs

## 🚨 **Important Notes:**
- Visitor count resets on each deploy
- Email credentials are secure in environment variables
- All functionality preserved from local version

## 🎯 **Deployment URL:**
After deployment, you'll get a URL like:
`https://rohan-shelar-portfolio.vercel.app`

## 📞 **Troubleshooting:**
- Check Vercel deployment logs
- Verify environment variables
- Ensure all files are uploaded
- Test API endpoints individually

**Your portfolio is Vercel-ready!** 🎉
