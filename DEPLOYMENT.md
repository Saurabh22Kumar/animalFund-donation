# Deployment Guide

## 🚀 Deploying AnimalCare Foundation Portal

This guide covers deploying the donation portal to various hosting platforms.

## 📋 Pre-Deployment Checklist

### ✅ **Before Deploying**
- [ ] Test the application locally
- [ ] Ensure all tests pass
- [ ] Verify environment files are not in git
- [ ] Have live Razorpay keys ready (for production)
- [ ] Test with small real payment (production only)

### ✅ **Build Verification**
```bash
# Test production build locally
npm run build:prod

# Serve production build
npx http-server dist/charitylite-client -p 8080
```

## 🌐 Platform-Specific Deployment

### Vercel (Recommended)

#### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Manual Setup
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd charitylite-client
   vercel --prod
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   ```
   RAZORPAY_KEY_ID=rzp_live_your_live_key
   NODE_ENV=production
   ```

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/charitylite-client"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Netlify

#### Drag & Drop Deploy
1. **Build locally**:
   ```bash
   npm run build:prod
   ```
2. **Drag** `dist/charitylite-client` folder to [Netlify Deploy](https://app.netlify.com/drop)

#### Git-Based Deploy
1. **Connect** repository to Netlify
2. **Build settings**:
   ```
   Build command: npm run build:prod
   Publish directory: dist/charitylite-client
   ```
3. **Environment variables**:
   ```
   RAZORPAY_KEY_ID=rzp_live_your_live_key
   NODE_ENV=production
   ```

#### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build:prod"
  publish = "dist/charitylite-client"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**:
   ```bash
   firebase login
   ```

3. **Initialize**:
   ```bash
   firebase init hosting
   ```

4. **Configure** `firebase.json`:
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

5. **Deploy**:
   ```bash
   npm run build:prod
   firebase deploy
   ```

### GitHub Pages

1. **Install** gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy:gh-pages": "ng deploy --base-href=/animalcare-foundation/"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run build:prod
   npm run deploy:gh-pages
   ```

### AWS S3 + CloudFront

1. **Build application**:
   ```bash
   npm run build:prod
   ```

2. **Create S3 bucket** with static website hosting

3. **Upload** `dist/charitylite-client` contents

4. **Configure CloudFront** for SPA routing

5. **Set up** error pages for 404 → index.html

## 🔒 Environment Variables Setup

### Required Variables
```bash
# Production Razorpay key
RAZORPAY_KEY_ID=rzp_live_your_live_key_here

# Environment
NODE_ENV=production

# Optional: Custom domain
CUSTOM_DOMAIN=donate.animalcarefoundation.org
```

### Security Considerations
- ✅ Use live keys only in production
- ✅ Never expose secret keys in frontend
- ✅ Use HTTPS in production
- ✅ Set up proper CORS if needed

## 🔧 Build Optimization

### Angular Build Options
```bash
# Production build with optimizations
ng build --configuration production

# Build with source maps for debugging
ng build --configuration production --source-map

# Analyze bundle size
ng build --configuration production --stats-json
npx webpack-bundle-analyzer dist/charitylite-client/stats.json
```

### Performance Optimizations
- ✅ Enable gzip compression
- ✅ Set up CDN for static assets
- ✅ Configure caching headers
- ✅ Optimize images and fonts

## 📊 Monitoring & Analytics

### Error Tracking
Consider integrating:
- **Sentry** for error monitoring
- **LogRocket** for session replay
- **Google Analytics** for user tracking

### Payment Monitoring
- **Razorpay Dashboard** for payment analytics
- **Custom logging** for payment events
- **Webhook verification** for security

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
      working-directory: ./charitylite-client
    
    - name: Run tests
      run: npm test -- --watch=false --browsers=ChromeHeadless
      working-directory: ./charitylite-client
    
    - name: Build application
      run: npm run build:prod
      working-directory: ./charitylite-client
      env:
        RAZORPAY_KEY_ID: ${{ secrets.RAZORPAY_KEY_ID }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./charitylite-client
```

## 🧪 Production Testing

### Smoke Tests
After deployment, verify:
- [ ] Application loads correctly
- [ ] All pages accessible
- [ ] Payment window opens
- [ ] Test payment with small amount
- [ ] Receipt generation works
- [ ] Error handling works

### Payment Testing
```bash
# Test payment flow
1. Use live payment gateway
2. Make small test donation
3. Verify webhook delivery (if implemented)
4. Check payment in Razorpay dashboard
5. Test refund process
```

## 🚨 Rollback Plan

### Quick Rollback
1. **Identify** last known good deployment
2. **Revert** to previous version
3. **Verify** application works
4. **Investigate** issue in staging

### Deployment Scripts
```bash
# Rollback to previous version
vercel --prod --target=previous

# Or deploy specific version
vercel --prod --target=<deployment-url>
```

## 📋 Post-Deployment

### Immediate Tasks
- [ ] Verify all functionality
- [ ] Test payment flow
- [ ] Check error monitoring
- [ ] Update DNS if needed
- [ ] Notify stakeholders

### Ongoing Monitoring
- [ ] Set up uptime monitoring
- [ ] Monitor payment success rates
- [ ] Track user analytics
- [ ] Review error logs regularly

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build:prod
```

#### Environment Variable Issues
```bash
# Verify variables are set
echo $RAZORPAY_KEY_ID

# Check build configuration
ng build --configuration production --verbose
```

#### Routing Issues
- Ensure SPA routing is configured
- Check redirect rules
- Verify base href is correct

#### Payment Gateway Issues
- Verify live keys are correct
- Check Razorpay dashboard for errors
- Test with known good payment method

## 📞 Support

### Getting Help
- 📚 Platform documentation
- 💬 Community forums
- 🎫 Support tickets
- 📧 Email: `devops@animalcarefoundation.org`

---

**Ready to deploy? Follow the platform-specific guide above! 🚀**
