# 🔧 Netlify Contact Form Troubleshooting Guide

## ❌ **Error: "Message failed to send try again"**

### **Common Causes & Solutions:**

## 🚨 **1. Environment Variables Missing**
**Problem:** Gmail credentials not set in Netlify

**Solution:**
1. Go to Netlify Dashboard → Your Site → Site Settings
2. Build & deploy → Environment variables
3. Add:
   ```
   GMAIL_USER = rohanshelar277@gmail.com
   GMAIL_PASS = lbhr ltik fqmd nwqj
   ```
4. Check "Sensitive" for both
5. Click "Save"
6. **Redeploy your site** (important!)

## 🚨 **2. Gmail App Password Issues**
**Problem:** Gmail app password incorrect or expired

**Solution:**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (must be enabled)
3. App passwords → Generate new password
4. Use "Mail" for app, "Windows Computer" for device
5. Copy the 16-character password
6. Update `GMAIL_PASS` in Netlify environment variables

## 🚨 **3. Gmail SMTP Connection Issues**
**Problem:** Gmail blocking connection

**Solution:**
1. Enable "Less secure app access" (temporary):
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → Less secure app access → Turn ON
2. Or use App Password (recommended above)

## 🚨 **4. Netlify Function Errors**
**Problem:** Function deployment issues

**Solution:**
1. Check Netlify Functions logs:
   - Netlify Dashboard → Your Site → Functions
   - View logs for `contact` function
2. Look for specific error messages
3. Common errors:
   - `EAUTH` → Authentication failed
   - `ECONNECTION` → Connection failed
   - `EMESSAGE` → Message format error

## 🔄 **Quick Fix Steps:**

### **Step 1: Verify Environment Variables**
```bash
# In Netlify terminal (if available)
echo $GMAIL_USER
echo $GMAIL_PASS
```

### **Step 2: Test Function Directly**
```bash
# Test with curl
curl -X POST \
  https://your-site.netlify.app/.netlify/functions/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","message":"Test message"}'
```

### **Step 3: Check Function Logs**
1. Netlify Dashboard → Functions
2. Click on `contact` function
3. View recent logs
4. Look for error messages

## 🛠️ **Alternative Solutions:**

### **Option A: Use Fallback Function**
If email keeps failing, switch to fallback:
```javascript
// In script_netlify.js
// Change this line:
const response = await fetch('/.netlify/functions/contact', {
// To this:
const response = await fetch('/.netlify/functions/contact-fallback', {
```

### **Option B: Use Third-Party Service**
Replace Nodemailer with:
- **Formspree** (free, easy)
- **Netlify Forms** (built-in)
- **EmailJS** (free tier)
- **Resend** (developer-friendly)

### **Option C: Static Fallback**
Use mailto link as backup:
```javascript
// Fallback to mailto if API fails
window.location.href = `mailto:rohanshelar277@gmail.com?subject=Contact from ${name}&body=${message}`;
```

## 📋 **Debugging Checklist:**
- [ ] Environment variables set in Netlify?
- [ ] Site redeployed after setting variables?
- [ ] Gmail 2-step verification enabled?
- [ ] App password generated correctly?
- [ ] Function logs show specific errors?
- [ ] CORS headers configured correctly?

## 🎯 **Most Common Fix:**
95% of the time, the issue is **environment variables not being set correctly** or **site not being redeployed** after setting them.

## 📞 **If Still Not Working:**
1. Check Netlify function logs for specific errors
2. Try the fallback function
3. Consider using Netlify Forms instead
4. Contact Netlify support for function issues

**The most important step is always: Set environment variables → Redeploy site!**
