# UPI Payment Integration Guide for AnimalCare Foundation

## Overview
This guide covers the complete Razorpay payment integration for the AnimalCare Foundation donation portal, including UPI, card payments, net banking, and wallet support in test mode.

## Current Implementation Status ✅

### Payment Methods Supported
- **UPI Payments** (Primary focus)
- **Credit/Debit Cards** (Visa, Mastercard, RuPay)
- **Net Banking** (All major banks)
- **Digital Wallets** (Paytm, PhonePe, Google Pay, etc.)

### Test Mode Configuration
- ✅ **Test Environment Active**: Using `rzp_test_i6UlCq0LTrlYGE`
- ✅ **No Real Money Charges**: All transactions are simulated
- ✅ **Test Credentials Support**: Invalid credentials accepted gracefully
- ✅ **Built-in Test Helper**: "Show Test Credentials" button in UI

## Key Features

### 1. Original Razorpay Window (Current)
- **Standard Razorpay Interface**: Native look and feel
- **All Payment Methods**: UPI, Cards, NetBanking, Wallets
- **UPI Priority**: UPI appears as first option
- **Test Mode Friendly**: Accepts test credentials seamlessly

### 2. Test Credentials Helper 🧪
A dedicated "Show Test Credentials" button provides:

#### Test Card Numbers
- **Visa**: `4111111111111111`
- **Mastercard**: `5555555555554444`
- **RuPay**: `6070000000000007`
- **CVV**: Any 3 digits (e.g., 123)
- **Expiry**: Any future date (e.g., 12/25)

#### Test UPI IDs
- `success@razorpay` (Success scenario)
- `failure@razorpay` (Failure testing)
- `test@upi` (General testing)

#### Test Net Banking
- Select any bank and use dummy credentials
- All major banks supported in test mode

## Implementation Details

### Environment Configuration
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  razorpay: {
    keyId: 'rzp_test_i6UlCq0LTrlYGE', // Test key
    currency: 'INR',
    name: 'AnimalCare Foundation',
    description: 'Help Save Animals',
    theme: { color: '#10b981' }
  }
};
```

### Receipt Generation
- **PDF Format**: Professional donation receipts
- **Currency Display**: "INR" used instead of ₹ symbol for PDF compatibility
- **Auto Download**: Receipt downloads automatically after successful payment
- **Unique Filenames**: Timestamp-based naming to prevent overwrites
- **Complete Details**: Includes donor info, amount, transaction ID, and message

### Payment Flow
1. **User Input**: Enters donation amount and personal details
2. **Validation**: Form validation ensures required fields
3. **Payment Gateway**: Razorpay window opens with all options
4. **Test Mode**: Accepts any test credentials or dummy data
5. **Success Handling**: Receipt generation and success state
6. **Error Handling**: Graceful failure management

---

**Last Updated**: June 2025  
**Test Mode**: Active (No real money charged)  
**Status**: Production Ready ✅
