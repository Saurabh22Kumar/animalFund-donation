# Security Policy

## 🔒 API Key Security

### ⚠️ CRITICAL: Never Commit API Keys

This project uses Razorpay API keys which must **NEVER** be committed to version control. Follow these guidelines:

### Environment File Security

#### ✅ **Safe Files (Committed)**
- `src/environments/environment.example.ts` - Template with placeholder keys
- `src/environments/environment.prod.example.ts` - Production template

#### ❌ **Sensitive Files (Never Commit)**
- `src/environments/environment.ts` - Contains actual test keys
- `src/environments/environment.prod.ts` - Contains actual live keys

### Setup Process

1. **Copy example files**:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
   ```

2. **Replace placeholder keys** with your actual Razorpay keys:
   ```typescript
   keyId: 'rzp_test_YOUR_ACTUAL_TEST_KEY_HERE'
   ```

3. **Verify .gitignore** includes environment files:
   ```
   src/environments/environment.ts
   src/environments/environment.prod.ts
   ```

## 🔑 Razorpay Key Types

### Test Keys
- **Format**: `rzp_test_xxxxxxxxxx`
- **Purpose**: Development and testing
- **Safety**: No real money transactions
- **Usage**: Safe to use for development

### Live Keys
- **Format**: `rzp_live_xxxxxxxxxx`
- **Purpose**: Production payments
- **Risk**: Real money transactions
- **Requirements**: KYC verification needed

## 🛡️ Security Best Practices

### Development
- ✅ Always use test keys in development
- ✅ Never share test keys publicly
- ✅ Use environment variables for deployment
- ✅ Regularly rotate API keys

### Production
- ✅ Use live keys only in production
- ✅ Store keys in secure environment variables
- ✅ Implement server-side webhook verification
- ✅ Monitor payment transactions
- ✅ Set up proper logging and alerts

### Code Security
- ✅ Never hardcode API keys in source code
- ✅ Use environment files for all sensitive data
- ✅ Validate all user inputs
- ✅ Implement proper error handling
- ✅ Use HTTPS in production

## 🚨 What to Do If Keys Are Compromised

### If Test Keys Are Exposed
1. Generate new test keys from Razorpay dashboard
2. Update environment files
3. No immediate risk (test keys don't process real money)

### If Live Keys Are Exposed
1. **IMMEDIATELY** disable the compromised keys in Razorpay dashboard
2. Generate new live keys
3. Update production environment variables
4. Monitor for any unauthorized transactions
5. Contact Razorpay support if needed

## 🔍 Security Checklist

### Before Committing Code
- [ ] Removed all API keys from source code
- [ ] Used placeholder values in example files
- [ ] Verified .gitignore includes environment files
- [ ] No sensitive data in commit history

### Before Deployment
- [ ] Live keys stored in secure environment variables
- [ ] Test keys removed from production build
- [ ] HTTPS enabled
- [ ] Webhook endpoints secured
- [ ] Error messages don't expose sensitive information

### Regular Security Maintenance
- [ ] Rotate API keys periodically
- [ ] Monitor payment logs for anomalies
- [ ] Keep dependencies updated
- [ ] Review access permissions
- [ ] Backup important data

## 📞 Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** create a public issue
2. Email security concerns to: `security@animalcarefoundation.org`
3. Include detailed information about the vulnerability
4. Allow reasonable time for response before public disclosure

## 🔗 Additional Resources

- [Razorpay Security Documentation](https://razorpay.com/docs/security/)
- [Angular Security Best Practices](https://angular.io/guide/security)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

---

**Remember: Security is everyone's responsibility! 🛡️**
