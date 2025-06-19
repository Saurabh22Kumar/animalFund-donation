# Environment Setup Guide

## 🔧 Setting Up Your Development Environment

This guide walks you through setting up the AnimalCare Foundation donation portal on your local machine.

## Prerequisites

### Required Software
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Modern Browser** (Chrome, Firefox, Safari, Edge)

### Optional Tools
- **VS Code** - Recommended IDE ([Download](https://code.visualstudio.com/))
- **Angular CLI** - For additional Angular commands
  ```bash
  npm install -g @angular/cli
  ```

## 🚀 Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/animalcare-foundation.git
cd animalcare-foundation/charitylite-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Files

**Copy example environment files:**
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
```

### 4. Configure Razorpay Keys

⚠️ **Important**: Get your keys from [Razorpay Dashboard](https://dashboard.razorpay.com/)

**Edit `src/environments/environment.ts`:**
```typescript
export const environment = {
  production: false,
  razorpay: {
    keyId: 'rzp_test_YOUR_ACTUAL_TEST_KEY', // Replace this!
    currency: 'INR',
    name: 'AnimalCare Foundation',
    description: 'Help Save Animals',
    theme: { color: '#10b981' }
  },
  app: {
    name: 'AnimalCare Foundation',
    description: 'Every donation saves a life. Help us rescue, rehabilitate, and protect animals in need.'
  }
};
```

### 5. Start Development Server
```bash
npm start
```

### 6. Open in Browser
Navigate to `http://localhost:4200`

## 🔑 Getting Razorpay Keys

### For Testing (Required)
1. **Sign up** at [Razorpay](https://razorpay.com)
2. **Go to** Settings → API Keys
3. **Generate** Test Key ID
4. **Copy** the Test Key ID (starts with `rzp_test_`)
5. **Paste** into `environment.ts`

### For Production (Optional)
1. **Complete KYC** verification in Razorpay dashboard
2. **Generate** Live Key ID
3. **Copy** the Live Key ID (starts with `rzp_live_`)
4. **Use** in production environment variables

## 🛠️ Development Commands

### Essential Commands
```bash
# Start development server
npm start

# Build for development
npm run build

# Build for production
npm run build:prod

# Run tests
npm test

# Run linting
npm run lint
```

### Angular CLI Commands
```bash
# Generate new component
ng generate component component-name

# Generate new service
ng generate service service-name

# Check Angular version
ng version
```

## 🌐 Environment Configuration

### Development Environment
- **File**: `src/environments/environment.ts`
- **Purpose**: Local development
- **Key Type**: Test keys only
- **Safety**: No real money transactions

### Production Environment
- **File**: `src/environments/environment.prod.ts`
- **Purpose**: Live deployment
- **Key Type**: Live keys
- **Safety**: Real money transactions

### Environment Variables for Deployment

For platforms like Vercel, Netlify, etc.:
```bash
RAZORPAY_KEY_ID=rzp_live_your_live_key
NODE_ENV=production
```

## 🎨 IDE Setup (VS Code)

### Recommended Extensions
```json
{
  "recommendations": [
    "angular.ng-template",
    "ms-vscode.typescript-hero",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

## 🧪 Testing Setup

### Test Environment
- Uses test Razorpay keys
- No real money transactions
- Built-in test credentials helper

### Available Test Data
- **Cards**: `4111111111111111`, `5555555555554444`
- **UPI**: `success@razorpay`, `test@upi`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## 🚨 Troubleshooting

### Common Issues

#### `npm install` fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Environment file not found
```bash
# Make sure you copied the example files
cp src/environments/environment.example.ts src/environments/environment.ts
```

#### Razorpay key not working
- Verify key format: `rzp_test_` for test, `rzp_live_` for live
- Check Razorpay dashboard for key status
- Ensure no extra spaces in the key

#### Port 4200 already in use
```bash
# Use different port
ng serve --port 4201

# Or kill existing process
lsof -ti:4200 | xargs kill -9
```

### Debug Mode
Enable detailed logging:
```typescript
// In environment.ts
export const environment = {
  production: false,
  debug: true, // Add this for detailed logs
  // ... rest of config
};
```

## 📱 Browser Support

### Tested Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile Support
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+
- ✅ Samsung Internet 14+

## 🔄 Updates and Maintenance

### Keeping Dependencies Updated
```bash
# Check for outdated packages
npm outdated

# Update Angular
ng update @angular/core @angular/cli

# Update other dependencies
npm update
```

### Version Compatibility
- **Angular**: 18.x
- **Node.js**: 18.x - 20.x
- **TypeScript**: 5.0+
- **Razorpay Checkout**: Latest

## 📞 Getting Help

### Resources
- 📚 [Angular Documentation](https://angular.io/docs)
- 💳 [Razorpay Documentation](https://razorpay.com/docs/)
- 🐛 [Project Issues](https://github.com/yourusername/animalcare-foundation/issues)

### Community
- 💬 Stack Overflow: Tag with `angular` and `razorpay`
- 🔧 GitHub Discussions
- 📧 Email: `support@animalcarefoundation.org`

---

**Ready to start developing? Follow the quick setup above! 🚀**
