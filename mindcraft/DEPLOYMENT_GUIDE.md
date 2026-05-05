# Mindcraft - Deployment Guide

Complete guide to deploy Mindcraft to various platforms.

## 🚀 Option 1: Vercel (Recommended)

### Step 1: Prepare Your Project
```bash
# Ensure all files are pushed to GitHub
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click "Sign Up" and connect with GitHub
3. Click "New Project"
4. Select your `mindcraft` repository
5. Click "Import"

### Step 3: Configure Environment Variables
1. In Vercel dashboard, click on your project
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

| Name | Value |
|------|-------|
| `MONGO_URI` | `mongodb+srv://username:password@cluster.mongodb.net/mindcraft` |
| `NODE_ENV` | `production` |

4. Click "Save"

### Step 4: Deploy
1. Click the "Deploy" button
2. Wait for deployment (usually 1-2 minutes)
3. Once complete, you'll get a URL like: `https://mindcraft-xxx.vercel.app`

### Step 5: Test
- Visit your deployed URL
- Fill out the form and submit
- Check if data is saved in MongoDB

---

## 🚀 Option 2: Heroku

### Step 1: Install Heroku CLI
```bash
# Download and install from https://devcenter.heroku.com/articles/heroku-cli
# Or use npm
npm install -g heroku
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
heroku create mindcraft-app
```

### Step 4: Set Environment Variables
```bash
heroku config:set MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindcraft
heroku config:set NODE_ENV=production
```

### Step 5: Deploy
```bash
git push heroku main
```

### Step 6: View Logs
```bash
heroku logs --tail
```

### Step 7: Open App
```bash
heroku open
```

---

## 🚀 Option 3: Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Link Project
```bash
railway link
```

### Step 4: Set Environment Variables
```bash
railway variables set MONGO_URI "mongodb+srv://username:password@cluster.mongodb.net/mindcraft"
railway variables set NODE_ENV production
```

### Step 5: Deploy
```bash
railway up
```

---

## 🚀 Option 4: AWS Elastic Beanstalk

### Step 1: Install EB CLI
```bash
pip install awsebcli
```

### Step 2: Create Application
```bash
eb init -p "Node.js 18" mindcraft
```

### Step 3: Configure Environment
Edit `.ebextensions/nodecommand.config`:
```yaml
option_settings:
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    MONGO_URI: mongodb+srv://username:password@cluster.mongodb.net/mindcraft
```

### Step 4: Create Environment
```bash
eb create mindcraft-env
```

### Step 5: Deploy
```bash
eb deploy
```

### Step 6: Open
```bash
eb open
```

---

## 🚀 Option 5: DigitalOcean App Platform

### Step 1: Connect GitHub
1. Visit [digitalocean.com/apps](https://www.digitalocean.com/products/app-platform/)
2. Click "Create App"
3. Select GitHub and authorize
4. Select your `mindcraft` repository
5. Click "Next"

### Step 2: Configure
- Set resource type to "Basic"
- Review the detected settings
- Click "Next"

### Step 3: Add Environment Variables
1. Click "Add Resource" → "Environment Variables"
2. Add:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindcraft
   NODE_ENV=production
   ```
3. Click "Next"

### Step 4: Review and Deploy
1. Review all settings
2. Click "Create Resources"
3. Wait for deployment

---

## 🌍 Setting Up MongoDB Atlas

### Step 1: Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Start free"
3. Create account with email

### Step 2: Create Organization
1. Follow the setup wizard
2. Select "Create a new organization"
3. Name it (e.g., "Mindcraft")

### Step 3: Create Project
1. Click "Create a Project"
2. Name it (e.g., "mindcraft-prod")
3. Click "Create Project"

### Step 4: Create Cluster
1. Click "Build a Database"
2. Select "M0" (Free tier)
3. Choose your region (closest to your users)
4. Click "Create Deployment"

### Step 5: Create User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `mindcraft_user`
4. Password: Generate secure password
5. Click "Create User"

### Step 6: Configure IP Whitelist
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for testing)
4. For production, add specific IPs
5. Click "Confirm"

### Step 7: Get Connection String
1. Go to "Database Deployment"
2. Click "Connect"
3. Select "Connect your application"
4. Copy connection string
5. Replace `<username>` and `<password>` with your credentials

---

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file configured with `MONGO_URI`
- [ ] `.gitignore` includes `.env`
- [ ] No sensitive data in code
- [ ] `vercel.json` or equivalent deployment config exists
- [ ] MongoDB Atlas cluster created and whitelist configured
- [ ] Database user created with strong password
- [ ] Local testing completed successfully
- [ ] All error messages are user-friendly
- [ ] Mobile responsiveness verified
- [ ] Form validation working
- [ ] Git repository initialized and committed
- [ ] `package.json` has correct start script
- [ ] All npm packages are in `dependencies` (not devDependencies)

---

## 🔒 Security Best Practices

### 1. Environment Variables
```bash
# Never commit .env to git
# .env should be in .gitignore
# Use strong, unique passwords for MongoDB
```

### 2. MongoDB Atlas
```bash
# Enable authentication
# Use strong passwords (min 16 characters)
# Whitelist only necessary IPs
# Use database user (not admin account)
```

### 3. CORS Configuration
```bash
# In production, specify exact origins
# app.use(cors({
#   origin: 'https://yourdomain.com'
# }))
```

### 4. Input Validation
```bash
# All inputs are validated server-side
# Phone numbers must be 10 digits
# Email must be valid format
# No SQL injection possible (MongoDB)
```

---

## 🐛 Troubleshooting Deployments

### Issue: MongoDB Connection Fails

**Symptoms:** `MongoNetworkError` or timeout errors

**Solutions:**
1. Verify MONGO_URI is correct
2. Check IP is whitelisted in MongoDB Atlas
3. Ensure database user exists and password is correct
4. Check network connectivity
5. Try with connection string from MongoDB Atlas directly

### Issue: App Crashes Immediately

**Symptoms:** Deployment succeeds but app won't start

**Solutions:**
1. Check deployment logs for errors
2. Verify `package.json` start script is correct
3. Ensure PORT is correctly configured
4. Check for missing dependencies

### Issue: Static Files Not Loading

**Symptoms:** CSS/JS files return 404

**Solutions:**
1. Verify `public/` folder is included in deployment
2. Check `express.static(path.join(__dirname, 'public'))`
3. Ensure files exist in public folder
4. Check file paths are case-sensitive

### Issue: CORS Errors

**Symptoms:** Browser shows CORS policy errors

**Solutions:**
1. CORS is enabled in server.js
2. Check frontend and backend have same origin (or configured CORS)
3. Verify requests include Content-Type header

### Issue: Form Data Not Saving

**Symptoms:** Form submits but data doesn't appear in database

**Solutions:**
1. Check MongoDB connection is successful
2. Verify database user has write permissions
3. Check /register endpoint logs
4. Test API with curl or Postman
5. Check browser console for errors

---

## 📊 Monitoring and Maintenance

### View Live Logs
```bash
# Vercel
vercel logs

# Heroku
heroku logs --tail

# Railway
railway logs
```

### Check Database
```bash
# MongoDB Atlas
# 1. Click "Browse Collections"
# 2. View events collection
# 3. Check registered data
```

### Performance Monitoring
- Monitor response times
- Track error rates
- Check database query performance
- Monitor server logs for issues

---

## 🎯 Next Steps After Deployment

1. **Share URL** - Send deployment URL to participants
2. **Monitor** - Watch for registrations and errors
3. **Backup** - Export important registration data regularly
4. **Scale** - If traffic increases, upgrade resources
5. **Optimize** - Monitor performance and optimize as needed

---

For more help, refer to the main README.md or contact support.
