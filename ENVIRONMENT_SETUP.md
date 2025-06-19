# Environment Setup Guide

This guide explains how to configure API keys and environment variables for the CharityLite application.

## Environment Files Structure

The CharityLite application uses Angular's environment system to manage configuration:

```
src/environments/
├── environment.ts      # Development configuration
└── environment.prod.ts # Production configuration
```

## Configuration Steps

### 1. Razorpay Setup

1. **Create a Razorpay Account**:
   - Go to [razorpay.com](https://razorpay.com)
   - Sign up for a free account
   - Complete the verification process

2. **Get Your API Keys**:
   - Log in to your Razorpay dashboard
   - Go to Settings → API Keys
   - Generate test and live keys

3. **Update Environment Files**:

   **For Development (`src/environments/environment.ts`):**
   ```typescript
   export const environment = {
     production: false,
     razorpay: {
       keyId: 'rzp_test_YOUR_ACTUAL_TEST_KEY_HERE', // Replace this
       currency: 'INR',
       name: 'CharityLite',
       description: 'Donation',
       image: 'https://yourdomain.com/logo.png', // Optional: your logo
       theme: {
         color: '#007bff'
       }
     },
     // ...rest of config
   };
   ```

   **For Production (`src/environments/environment.prod.ts`):**
   ```typescript
   export const environment = {
     production: true,
     razorpay: {
       keyId: 'rzp_live_YOUR_ACTUAL_LIVE_KEY_HERE', // Replace this
       // ...rest of config
     },
     // ...rest of config
   };
   ```

### 2. App Customization

You can customize the app by modifying the environment configuration:

```typescript
app: {
  name: 'Your Organization Name',
  description: 'Your custom description'
}
```

### 3. Security Best Practices

- ✅ **DO**: Use test keys during development
- ✅ **DO**: Use live keys only in production
- ✅ **DO**: Keep your live keys secure and never commit them to version control
- ❌ **DON'T**: Share your API keys publicly
- ❌ **DON'T**: Use live keys in development

## Building for Different Environments

### Development
```bash
ng serve
# Uses environment.ts automatically
```

### Production Build
```bash
ng build --configuration production
# Uses environment.prod.ts automatically
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `razorpay.keyId` | Your Razorpay API key | `rzp_test_1234567890` |
| `razorpay.currency` | Payment currency | `INR`, `USD`, etc. |
| `razorpay.name` | Organization name | `CharityLite` |
| `razorpay.description` | Payment description | `Donation` |
| `razorpay.image` | Organization logo URL | `https://yoursite.com/logo.png` |
| `razorpay.theme.color` | Theme color | `#007bff` |
| `app.name` | Application name | `CharityLite` |
| `app.description` | App description | `Make a difference` |

## Troubleshooting

### Common Issues

1. **"Invalid key" error**:
   - Check that you're using the correct key for the environment
   - Ensure test keys start with `rzp_test_` and live keys with `rzp_live_`

2. **Environment not switching**:
   - Make sure the `fileReplacements` configuration is correct in `angular.json`
   - Clear the Angular build cache: `ng build --delete-output-path`

3. **API key not recognized**:
   - Verify the key is active in your Razorpay dashboard
   - Check for extra spaces or characters in the key

### Getting Help

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Angular Environment Guide](https://angular.io/guide/build#configuring-application-environments)

## Security Note

Never commit actual API keys to version control. The `.gitignore` file is configured to ignore sensitive environment files.
