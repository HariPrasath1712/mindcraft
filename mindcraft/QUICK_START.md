# 🚀 Mindcraft - Quick Start Guide

Get Mindcraft running locally in 5 minutes!

## Prerequisites
- ✅ Node.js v14+ installed ([download](https://nodejs.org))
- ✅ MongoDB running locally ([download](https://www.mongodb.com/try/download/community)) OR
- ✅ MongoDB Atlas account ([signup](https://www.mongodb.com/cloud/atlas))

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Configure Database (1 min)

**Option A: Local MongoDB**
- Make sure MongoDB is running
- The default `.env` is already set to `mongodb://localhost:27017/mindcraft`
- No changes needed!

**Option B: MongoDB Atlas**
- Edit `.env` file
- Replace MONGO_URI with your connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindcraft
```

### Step 3: Start Server (1 min)
```bash
npm run dev
```

You'll see:
```
✓ MongoDB connected successfully
🚀 Mindcraft Event Registration Server running on port 3000
📍 Visit: http://localhost:3000
🔗 API: http://localhost:3000/register
```

### Step 4: Open in Browser (1 min)
Visit: **http://localhost:3000**

### Step 5: Test Registration (1 min)
1. Fill out the form with sample data
2. Click "Register Now"
3. See success message
4. Check MongoDB to verify data was saved

## ✅ That's it!

Your Event Registration platform is now running! 🎉

## 📝 Sample Test Data
```
Full Name: John Doe
Email: john@example.com
Phone: 9876543210
College: MIT
Department: Computer Science
Year: 2nd Year
Event: Tech Summit 2024
```

## 🎯 Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start with auto-reload (development) |
| `npm start` | Start server (production) |
| `npm test` | Run tests (if configured) |

## 🔍 Testing the API

### Using cURL
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "phoneNumber": "9876543210",
    "collegeName": "Stanford",
    "department": "Information Technology",
    "year": "3rd Year",
    "eventName": "Web Development Workshop"
  }'
```

### Get All Registrations
```bash
curl http://localhost:3000/api/registrations
```

## 🐛 Quick Troubleshooting

**MongoDB not connecting?**
```bash
# Check if MongoDB is running
# Windows: mongod should be running
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Port 3000 already in use?**
```bash
# Kill the process
# Windows: netstat -ano | findstr :3000 → taskkill /PID <PID> /F
# macOS/Linux: lsof -i :3000 → kill -9 <PID>
```

**Module not found errors?**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 What's Next?

- 📖 Read full [README.md](README.md)
- 🚀 Deploy to [Vercel](DEPLOYMENT_GUIDE.md)
- 🎨 Customize the design in [public/style.css](public/style.css)
- 📝 Add more fields to the form in [public/index.html](public/index.html)
- ⚙️ Modify API in [server.js](server.js)

## 📞 Need Help?

- Check [README.md](README.md) for detailed documentation
- Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for production setup
- Check browser console (F12) for frontend errors
- Check terminal logs for backend errors

---

**🎉 Happy Coding! Enjoy Mindcraft!**
