# 🚀 Deployment Guide - AnimalCare Foundation

This guide provides multiple free deployment options for the AnimalCare Foundation donation portal.

## 📋 Prerequisites

- ✅ Project pushed to GitHub: `https://github.com/Saurabh22Kumar/animalFund-donation.git`
- ✅ Environment variables configured locally (not in repo for security)
- ✅ Production build tested locally

## 🌟 Deployment Options (All Free)

### 1. **Vercel** (Recommended ⭐)

**Pros:** Excellent Angular support, automatic CI/CD, fast CDN, custom domains
**Limits:** 100GB bandwidth/month, 6,000 build minutes/month

#### Steps:
1. Visit [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" → Import your GitHub repository
3. Configure project:
   - **Framework Preset:** Angular
   - **Root Directory:** `charitylite-client`
   - **Build Command:** `npm run build:prod`
   - **Output Directory:** `dist/charitylite-client`
4. Add environment variables in Vercel dashboard:
   - `RAZORPAY_KEY_ID` = your_razorpay_key_id
   - `RAZORPAY_KEY_SECRET` = your_razorpay_key_secret
5. Deploy! 🎉

**Custom Domain:** Free custom domain support in project settings.

---

### 2. **Netlify**

**Pros:** Drag-and-drop deployment, form handling, edge functions
**Limits:** 100GB bandwidth/month, 300 build minutes/month

#### Steps:
1. Build the project locally:
   ```bash
   cd charitylite-client
   npm run build:prod
   ```

2. **Option A: Drag & Drop**
   - Visit [netlify.com](https://netlify.com)
   - Drag `dist/charitylite-client` folder to deploy area

3. **Option B: GitHub Integration**
   - Connect GitHub repository
   - Set build settings:
     - **Base directory:** `charitylite-client`
     - **Build command:** `npm run build:prod`
     - **Publish directory:** `charitylite-client/dist/charitylite-client`

4. Add environment variables in Netlify dashboard

---

### 3. **GitHub Pages**

**Pros:** Integrated with GitHub, simple setup
**Limits:** Static sites only, 1GB storage, 100GB bandwidth/month

#### Steps:
1. Install GitHub Pages deployment tool:
   ```bash
   cd charitylite-client
   npm install --save-dev angular-cli-ghpages
   ```

2. Add deployment script to `package.json`:
   ```json
   "scripts": {
     "deploy:gh-pages": "ng build --configuration production --base-href '/animalFund-donation/' && npx angular-cli-ghpages --dir=dist/charitylite-client"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy:gh-pages
   ```

4. Enable GitHub Pages in repository settings → Pages → Source: `gh-pages` branch

**Live URL:** `https://saurabh22kumar.github.io/animalFund-donation/`

---

### 4. **Firebase Hosting**

**Pros:** Google infrastructure, excellent performance, free SSL
**Limits:** 1GB storage, 10GB bandwidth/month

#### Steps:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase in your project:
   ```bash
   cd charitylite-client
   firebase login
   firebase init hosting
   ```

3. Configure `firebase.json`:
   ```json
   {
     "hosting": {
       "public": "dist/charitylite-client",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. Build and deploy:
   ```bash
   npm run build:prod
   firebase deploy
   ```

---

### 5. **Surge.sh**

**Pros:** Simple CLI deployment, fast setup
**Limits:** Basic features on free plan

#### Steps:
1. Install Surge:
   ```bash
   npm install -g surge
   ```

2. Build and deploy:
   ```bash
   cd charitylite-client
   npm run build:prod
   cd dist/charitylite-client
   surge
   ```

3. Follow prompts to set domain name

---

## 🔧 Environment Variables Setup

For all platforms, you'll need to configure these environment variables:

### Required Variables:
```
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
NODE_ENV=production
```

### Platform-Specific Setup:

**Vercel/Netlify:** Add in dashboard under Project Settings → Environment Variables

**GitHub Pages:** Use GitHub Secrets (Actions) - but note: client-side apps expose env vars

**Firebase:** Use Firebase Remote Config or Functions for sensitive data

---

## 🛡️ Security Considerations

1. **API Keys:** 
   - Use test mode keys for demo deployment
   - For production, implement server-side validation
   - Consider using Firebase Functions or Vercel Serverless Functions

2. **Domain Security:**
   - Configure CORS in Razorpay dashboard
   - Add your deployment domain to authorized domains

3. **Environment Files:**
   - ✅ Never commit actual API keys
   - ✅ Use example files for reference
   - ✅ Set up proper .gitignore

---

## 🎯 Recommended Deployment Strategy

### For Demo/Portfolio:
**Vercel** - Best developer experience, automatic deployments

### For Production:
1. Use **Vercel** or **Netlify** for frontend
2. Implement backend API for payment processing
3. Use proper environment variable management
4. Set up monitoring and analytics

---

## 🚀 Quick Start Commands

### Vercel (Easiest):
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from project root
vercel

# Or use web interface at vercel.com
```

### Local Testing:
```bash
cd charitylite-client
npm run build:prod
npm run serve:prod
```

---

## 📞 Support

If you encounter issues:
1. Check the deployment platform's documentation
2. Verify environment variables are set correctly
3. Test the production build locally first
4. Check browser console for errors

---

## 🎉 Post-Deployment Checklist

- [ ] Test all payment flows with test credentials
- [ ] Verify dark mode toggle works
- [ ] Test on mobile devices
- [ ] Check form validations
- [ ] Verify PDF receipt generation
- [ ] Test error handling
- [ ] Monitor performance metrics

Your AnimalCare Foundation is ready to make a difference! 🐾💚
