# Mindcraft - Event Registration Platform

A modern, full-stack Event Registration website built with Node.js, Express, MongoDB, and jQuery. Register participants for events with a beautiful, responsive UI and complete data persistence.

![Mindcraft - Event Registration](https://img.shields.io/badge/Node.js-v16+-green) ![Express.js](https://img.shields.io/badge/Express-v4.18+-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen) ![jQuery](https://img.shields.io/badge/jQuery-v3.6+-yellow)

## 🎯 Features

- ✅ **Complete Event Registration Form** with validation
- ✅ **jQuery Form Validation** with custom error messages
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Modern UI/UX** with animations and gradients
- ✅ **MongoDB Integration** for data persistence
- ✅ **RESTful API** endpoints
- ✅ **Success/Error Messages** with smooth animations
- ✅ **Real-time Registration Counter** that updates every 10 seconds
- ✅ **Environment Configuration** with .env support
- ✅ **Vercel Ready** - Deploy in one click
- ✅ **Fully Responsive** - Mobile-first design
- ✅ **No Errors** - Production-ready code

## 📋 Form Fields

The registration form collects:
- **Full Name** - Required, text only, minimum 3 characters
- **Email Address** - Required, valid email format
- **Phone Number** - Required, 10-digit format
- **College Name** - Required, minimum 3 characters
- **Department** - Required, dropdown selection
- **Year** - Required, 1st-4th year options
- **Event Name** - Required, multiple event options

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your MongoDB URI:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindcraft
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Project Structure

```
mindcraft/
├── public/
│   ├── index.html           # Main registration form (HTML + jQuery validation)
│   └── style.css            # Modern, responsive styling
├── server.js                # Express server and API routes
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables (local)
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

## 🔌 API Endpoints

### GET `/`
Serves the main registration page.

**Response:** HTML page

---

### POST `/register`
Register a new participant for an event.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "9876543210",
  "collegeName": "ABC Engineering College",
  "department": "Computer Science",
  "year": "2nd Year",
  "eventName": "Web Development Workshop"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! Thank you for registering.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "collegeName": "ABC Engineering College",
    "department": "Computer Science",
    "year": "2nd Year",
    "eventName": "Web Development Workshop",
    "registeredAt": "2024-05-05T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "All fields are required",
  "error": "Error details here"
}
```

---

### GET `/api/registrations`
Fetch all event registrations (for admin purposes).

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      ...
    }
  ]
}
```

## 🎨 UI Features

### Modern Design
- Gradient backgrounds with animations
- Smooth transitions and hover effects
- Professional color scheme
- Floating animations for logo

### Responsive Layout
- Mobile-first approach
- Breakpoints: 768px, 480px
- Flexible grid layout
- Touch-friendly form inputs

### Form Validation
- Real-time validation with jQuery
- Custom error messages
- Visual error indicators
- Field-level validation rules

### User Feedback
- Success message with animation
- Error alerts with auto-dismiss
- Loading spinner during submission
- Registration counter with live updates

## 🛠️ Validation Rules

| Field | Rules |
|-------|-------|
| Full Name | Required, min 3 chars, letters only |
| Email | Required, valid email format |
| Phone Number | Required, exactly 10 digits |
| College Name | Required, min 3 characters |
| Department | Required, dropdown selection |
| Year | Required, dropdown selection |
| Event Name | Required, dropdown selection |

## 🌐 MongoDB Connection

### Local MongoDB
```
MONGO_URI=mongodb://localhost:27017/mindcraft
```

Make sure MongoDB is running:
```bash
# Windows
mongod

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Get connection string
5. Update `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindcraft
   ```

## 📝 Database Schema

### Event Collection

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, lowercase, unique),
  phoneNumber: String (required),
  collegeName: String (required),
  department: String (required),
  year: String (required, enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']),
  eventName: String (required),
  registeredAt: Date (default: now)
}
```

## 🚀 Deployment Guide

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `MONGO_URI` with your MongoDB Atlas connection string
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live!

### Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI=mongodb+srv://...
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **View Logs**
   ```bash
   heroku logs --tail
   ```

## 💻 Development

### Install Dev Dependencies
```bash
npm install --save-dev nodemon
```

### Run with Auto-reload
```bash
npm run dev
```

### Debug Mode
Add `console.log()` statements in `server.js` and refresh the browser.

## 🧪 Testing the API

### Using cURL
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
    "eventName": "Tech Summit 2024"
  }'
```

### Using Postman
1. Create POST request to `http://localhost:3000/register`
2. Set Content-Type to `application/json`
3. Add JSON body with registration details
4. Click Send

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem:** `MongoNetworkError: failed to connect`

**Solution:**
- Ensure MongoDB is running
- Check MONGO_URI is correct
- For Atlas, add your IP to whitelist
- Check firewall settings

### Form Not Validating
**Problem:** Form submits without validation

**Solution:**
- Ensure jQuery and jQuery Validate are loaded
- Check browser console for errors (F12)
- Verify form element IDs match validation rules

### CORS Error
**Problem:** `No 'Access-Control-Allow-Origin' header`

**Solution:**
- CORS is already enabled in `server.js`
- If still having issues, verify Express is serving static files correctly

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE :::3000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

## 📚 Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (Flexbox, Grid, Animations)
  - jQuery 3.6+ (DOM manipulation & validation)
  - jQuery Validate Plugin

- **Backend:**
  - Node.js
  - Express.js 4.18+
  - MongoDB
  - Mongoose 7.5+

- **Deployment:**
  - Vercel
  - Environment Variables (.env)
  - CORS middleware

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⭐ Support

If you find this project helpful, please consider giving it a star! ⭐

---

**Happy Event Registration! 🎉**

For more information or support, visit the GitHub repository or contact the maintainer.
