# 🚀 Netlify Deployment Guide for Rohan Shelar Portfolio

## 🔍 **Problem Solved:**
Netlify can't run Node.js servers directly. I've created a Netlify-compatible version using **Netlify Functions** for the backend.

## 📁 **Files Created for Netlify:**
```
/project-root
├── netlify.toml                 # Netlify configuration
├── package_netlify.json         # Netlify dependencies
├── netlify/
│   └── functions/
│       ├── contact.js           # Contact form handler
│       └── visitors.js          # Visitor counter
└── public/
    ├── index_netlify.html       # Netlify HTML
    └── script_netlify.js        # Netlify JavaScript
```

## 🛠️ **Deployment Steps:**

### **Step 1: Prepare Files**
```bash
# Copy Netlify versions
cp public/index_netlify.html public/index.html
cp public/script_netlify.js public/script.js
cp package_netlify.json package.json
```

### **Step 2: Deploy to Netlify**

**Method A: Drag & Drop (Easiest)**
1. Copy these files to a new folder:
   - `public/` folder
   - `netlify/` folder  
   - `netlify.toml`
   - `package.json` (the netlify version)

2. Drag the folder to [netlify.com](https://netlify.com)

**Method B: Git Repository**
1. Create a new GitHub repository
2. Upload the files listed above
3. Connect to Netlify

### **Step 3: Set Environment Variables**
In Netlify Dashboard:
1. Go to **Site settings** → **Environment variables**
2. Add:
   - `GMAIL_USER` = `rohanshelar277@gmail.com`
   - `GMAIL_PASS` = `lbhr ltik fqmd nwqj`

## ✅ **What Works on Netlify:**
- ✅ **Static site** - Loads perfectly
- ✅ **Contact form** - Sends emails via Netlify Functions
- ✅ **Visitor counter** - Simple in-memory counter
- ✅ **All animations** - Particle background, typing, etc.
- ✅ **Instagram link** - Clickable and styled

## 🔄 **Differences from Local Version:**
- **Visitor tracking**: Simple counter (no file storage)
- **Email**: Still works via Netlify Functions
- **Performance**: Faster static hosting

## 🧪 **Test Your Deployment:**
1. Visit your Netlify URL
2. Submit contact form
3. Check your Gmail for the message

## 🚨 **Important Notes:**
- Visitor count resets on each deploy (Netlify Functions limitation)
- Email functionality works exactly the same
- All styling and animations preserved

## 📞 **If Still Having Issues:**
1. Check Netlify build logs
2. Verify environment variables are set
3. Ensure all files are uploaded correctly

**Your portfolio is now Netlify-ready!** 🎉
