# Mindcraft - Complete Setup Guide

This guide walks you through setting up Mindcraft from scratch, step by step.

## 📚 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Installation](#project-installation)
3. [Database Setup](#database-setup)
4. [Local Development](#local-development)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### What You Need
- **Node.js v14+** - JavaScript runtime
- **npm** - Package manager (comes with Node.js)
- **MongoDB** - Database (local or cloud)
- **Text Editor** - VS Code, Sublime Text, etc.
- **Browser** - Chrome, Firefox, Safari, Edge

### Installation

#### 1. Install Node.js and npm

**Windows:**
- Visit https://nodejs.org
- Download LTS version
- Run installer
- Click through the setup wizard
- Accept default options

**macOS:**
```bash
# Using Homebrew (if you have it)
brew install node

# Or download from https://nodejs.org
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Or download from https://nodejs.org
```

**Verify Installation:**
```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show 6.0.0 or higher
```

#### 2. Install MongoDB (Choose One)

**Option A: Local MongoDB**

Windows:
- Download from https://www.mongodb.com/try/download/community
- Run installer
- MongoDB will be installed as a service
- It starts automatically

macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Linux (Ubuntu):
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

**Verify MongoDB is Running:**
```bash
# You should be able to connect
mongo --version
```

**Option B: MongoDB Atlas (Cloud)**

1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" (or Sign In if you have account)
3. Create free account
4. Create organization and project
5. Build cluster (M0 free tier)
6. Wait for cluster to be ready (5-10 minutes)
7. Click "Connect" → "Connect your application"
8. Copy connection string
9. Replace `<password>` with your password
10. Keep this connection string for later

---

## Project Installation

### Step 1: Download/Clone Project

**If you have Git:**
```bash
git clone <repository-url>
cd mindcraft
```

**If you don't have Git:**
1. Download as ZIP from GitHub
2. Extract the ZIP file
3. Open terminal/command prompt
4. Navigate to the extracted folder:
```bash
cd path/to/mindcraft
```

### Step 2: Install Node Dependencies

```bash
npm install
```

**What this does:**
- Reads `package.json`
- Downloads all required packages
- Installs them in `node_modules/` folder
- Creates `package-lock.json` file

**This may take 1-2 minutes. You'll see:**
```
added XX packages in Xs
```

### Step 3: Verify Installation

```bash
npm list
```

You should see:
```
mindcraft-event-registration@1.0.0
├── body-parser@1.20.2
├── cors@2.8.5
├── dotenv@16.3.1
├── express@4.18.2
├── mongoose@7.5.0
└── nodemon@3.0.1
```

---

## Database Setup

### Option A: Using Local MongoDB

**Windows/macOS/Linux:**

1. **Start MongoDB Service:**
   
   Windows: Should start automatically
   
   macOS:
   ```bash
   brew services start mongodb-community
   ```
   
   Linux:
   ```bash
   sudo systemctl start mongod
   ```

2. **Verify Connection:**
   ```bash
   mongo --version
   ```

3. **Check `.env` file:**
   ```
   MONGO_URI=mongodb://localhost:27017/mindcraft
   ```
   
   This is already set correctly!

4. **Done!** Your local MongoDB is ready.

### Option B: Using MongoDB Atlas (Cloud)

1. **Create Account & Cluster** (see Prerequisites section)

2. **Get Connection String:**
   - Go to "Clusters" → "Connect"
   - Select "Connect your application"
   - Copy the connection string

3. **Edit `.env` file:**
   
   Open `c:\Users\harip\OneDrive\Desktop\mindcraft\.env` in a text editor
   
   Replace this line:
   ```
   MONGO_URI=mongodb://localhost:27017/mindcraft
   ```
   
   With your connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindcraft
   ```
   
   Make sure to:
   - Replace `username` with your MongoDB user
   - Replace `password` with your MongoDB password
   - Keep `mindcraft` as database name (or change if you prefer)

4. **Whitelist Your IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - For production, add specific IPs only

5. **Done!** Your cloud MongoDB is ready.

---

## Local Development

### Starting the Server

**Open Terminal/Command Prompt:**

```bash
# Navigate to project folder (if not already there)
cd c:\Users\harip\OneDrive\Desktop\mindcraft

# Start development server with auto-reload
npm run dev
```

**You should see:**
```
✓ MongoDB connected successfully
🚀 Mindcraft Event Registration Server running on port 3000
📍 Visit: http://localhost:3000
🔗 API: http://localhost:3000/register
```

### Accessing the Application

1. **Open Browser**
2. **Visit:** http://localhost:3000
3. **You should see:** The registration form with beautiful styling

### Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## Testing

### Manual Testing (Browser)

1. **Fill out form with sample data:**
   ```
   Full Name: John Doe
   Email: john@example.com
   Phone: 9876543210
   College: ABC Engineering
   Department: Computer Science
   Year: 2nd Year
   Event: Tech Summit 2024
   ```

2. **Click "Register Now"**

3. **Expected Result:**
   - Success message appears
   - Form clears
   - New registration count updates

4. **Verify Data in MongoDB:**
   
   **Local MongoDB:**
   ```bash
   mongo
   use mindcraft
   db.events.find()
   ```
   
   **MongoDB Atlas:**
   - Log into Atlas
   - Click on cluster
   - Click "Browse Collections"
   - Select "events" collection
   - View registered data

### API Testing (Advanced)

#### Test with cURL

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "phoneNumber": "9876543210",
    "collegeName": "XYZ University",
    "department": "Information Technology",
    "year": "3rd Year",
    "eventName": "Web Development Workshop"
  }'
```

#### Test with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new POST request
3. URL: `http://localhost:3000/register`
4. Set header: `Content-Type: application/json`
5. Body (raw):
   ```json
   {
     "fullName": "Jane Smith",
     "email": "jane@example.com",
     "phoneNumber": "9876543210",
     "collegeName": "XYZ University",
     "department": "Information Technology",
     "year": "3rd Year",
     "eventName": "Web Development Workshop"
   }
   ```
6. Click Send
7. See response

#### Get All Registrations

```bash
curl http://localhost:3000/api/registrations
```

---

## Troubleshooting

### Problem: MongoDB Connection Error

**Error Message:**
```
✗ MongoDB connection error: connect ECONNREFUSED
```

**Solution:**
1. Check if MongoDB is running
   - Windows: Check Services
   - macOS: `brew services list`
   - Linux: `sudo systemctl status mongod`

2. For Local MongoDB:
   - Ensure `MONGO_URI=mongodb://localhost:27017/mindcraft`

3. For MongoDB Atlas:
   - Verify connection string is correct
   - Check IP is whitelisted
   - Verify username and password

### Problem: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE :::3000
```

**Solution:**

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

macOS/Linux:
```bash
lsof -i :3000
kill -9 <PID>
```

Or change port in `.env`:
```
PORT=3001
```

### Problem: Module Not Found

**Error Message:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

### Problem: Form Validation Not Working

**Issue:** Form submits without validation

**Solution:**
1. Check browser console (F12 → Console)
2. Verify jQuery is loaded
3. Check form field IDs match validation rules
4. Refresh page

### Problem: Static Files Not Loading (CSS/JS)

**Issue:** Page loads but styling is broken

**Solution:**
1. Check files exist in `public/` folder
2. Verify server is serving static files
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh (Ctrl+F5)

### Problem: Form Data Not Saving

**Issue:** Form submits, success message shows, but no data in database

**Solution:**
1. Check MongoDB is running
2. Verify connection string in `.env`
3. Check MongoDB user has write permissions
4. Check browser console for errors (F12)
5. Check server logs in terminal

### Problem: CORS Errors

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:3000/register' has been blocked by CORS policy
```

**Solution:**
CORS is already enabled in the code. Usually this means:
1. Server is not running
2. URL is incorrect
3. Check if request method is POST (not GET)

---

## File Structure Explanation

```
mindcraft/
├── public/
│   ├── index.html       # Registration form (HTML + jQuery validation)
│   └── style.css        # Beautiful, responsive styling
├── server.js            # Express server + API routes + MongoDB config
├── package.json         # Project dependencies
├── .env                 # Environment variables (LOCAL ONLY)
├── .env.example         # Template for environment variables
├── .gitignore           # Files to ignore in Git
├── vercel.json          # Vercel deployment config
├── README.md            # Full documentation
├── QUICK_START.md       # Quick setup guide
├── SETUP_GUIDE.md       # This detailed guide
├── DEPLOYMENT_GUIDE.md  # Production deployment guide
└── API_DOCUMENTATION.md # API reference
```

---

## Environment Variables Explained

In `.env` file:

```bash
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/mindcraft

# Server Port (default: 3000)
PORT=3000

# Environment (development/production)
NODE_ENV=development
```

**Never commit `.env` to Git** - it contains sensitive information!

---

## Next Steps

1. ✅ **Setup Complete!** Server is running
2. 📝 **Customize** - Edit HTML form or add more fields
3. 🎨 **Style** - Modify CSS in `public/style.css`
4. 🚀 **Deploy** - Follow DEPLOYMENT_GUIDE.md
5. 📊 **Monitor** - Track registrations in database

---

## Quick Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# View Node version
node --version

# View npm version
npm --version

# View installed packages
npm list

# List MongoDB databases (if MongoDB CLI installed)
mongo --version

# Check if port 3000 is in use (macOS/Linux)
lsof -i :3000

# Check if port 3000 is in use (Windows)
netstat -ano | findstr :3000
```

---

## Support Resources

- 📖 **README.md** - Full documentation
- 🚀 **DEPLOYMENT_GUIDE.md** - Production deployment
- ⚡ **QUICK_START.md** - Fast setup
- 📚 **API_DOCUMENTATION.md** - API reference
- 🐛 **GitHub Issues** - Report bugs
- 💬 **Community Discord** - Get help

---

## Common Questions

**Q: Can I use this in production?**
A: Yes! Follow DEPLOYMENT_GUIDE.md for production setup.

**Q: Can I add more form fields?**
A: Yes! Edit `public/index.html` and `server.js` to add fields.

**Q: Can I change the styling?**
A: Yes! Modify `public/style.css` to customize the look.

**Q: Is MongoDB free?**
A: Yes! MongoDB Atlas offers a free tier with 512MB storage.

**Q: Can I deploy to Vercel?**
A: Yes! All necessary config is included. Follow DEPLOYMENT_GUIDE.md.

**Q: What if I forget the MongoDB password?**
A: For MongoDB Atlas, reset it in Security → Database Access.

---

## Security Notes

1. **Never commit `.env` to Git** - Use `.gitignore`
2. **Use strong passwords** - Min 16 characters for MongoDB
3. **Whitelist IPs** - Don't use "Allow Access from Anywhere" in production
4. **Use HTTPS** - Enable SSL/TLS in production
5. **Validate input** - Server-side validation is implemented
6. **Keep dependencies updated** - Run `npm update` regularly

---

**Congratulations! You're now ready to use Mindcraft! 🎉**

For detailed API documentation, see API_DOCUMENTATION.md
For deployment options, see DEPLOYMENT_GUIDE.md
