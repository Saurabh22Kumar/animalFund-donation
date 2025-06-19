# 🐾 AnimalCare Foundation - Donation Portal

A modern, responsive donation platform built with Angular, featuring Razorpay payment integration with UPI, card payments, net banking, and digital wallets support.

![AnimalCare Foundation](https://img.shields.io/badge/AnimalCare-Foundation-green?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-18+-red?style=for-the-badge&logo=angular)
![Razorpay](https://img.shields.io/badge/Razorpay-Integration-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)

## 🌟 Features

### 💳 **Payment Integration**
- **Multi-Payment Support**: UPI, Credit/Debit Cards, Net Banking, Digital Wallets
- **Razorpay Integration**: Secure, PCI-compliant payment processing
- **Test Mode**: Safe testing environment with test credentials
- **UPI Priority**: UPI appears as the primary payment option
- **Receipt Generation**: Automatic PDF receipt generation

### 🎨 **Modern UI/UX**
- **Animal-Themed Design**: Beautiful paw icons and animal-centric imagery
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Micro-Interactions**: Smooth animations and hover effects
- **Impact Preview**: Real-time donation impact visualization

### 🔧 **Developer Features**
- **Test Credentials Helper**: Built-in button to show test payment details
- **Comprehensive Logging**: Detailed console logging for debugging
- **Error Handling**: Graceful error management and user feedback
- **TypeScript**: Full type safety and modern development experience

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd CharityLite/charitylite-client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. **Configure API Keys** (Important):
   - See [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for detailed instructions
   - Update `src/environments/environment.ts` with your Razorpay test key
   - Update `src/environments/environment.prod.ts` with your live key (for production)

5. Start the development server:
   ```bash
   ng serve
   ```

6. Open your browser and navigate to `http://localhost:4200`

### Configuration

The application uses environment files for configuration management. All API keys and settings are centralized in environment files.

#### Quick Setup

1. **Get Razorpay API Keys**:
   - Sign up at [razorpay.com](https://razorpay.com)
   - Get your test/live API keys from the dashboard

2. **Update Environment Files**:
   ```typescript
   // src/environments/environment.ts (Development)
   razorpay: {
     keyId: 'rzp_test_YOUR_ACTUAL_TEST_KEY',
     // ...other settings
   }
   ```

3. **See Detailed Setup**: Check [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for complete instructions

### Production Build

To build the application for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
charitylite-client/
├── src/
│   ├── app/
│   │   ├── donation-form/          # Donation form component
│   │   │   ├── donation-form.ts    # Component logic
│   │   │   ├── donation-form.html  # Template
│   │   │   └── donation-form.css   # Styles
│   │   ├── app.ts                  # Root component
│   │   ├── app.html                # Root template
│   │   └── app.css                 # Root styles
│   ├── index.html                  # Main HTML file
│   ├── main.ts                     # Application bootstrap
│   └── styles.css                  # Global styles
├── angular.json                    # Angular CLI configuration
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript configuration
```

## How It Works

1. **User Experience**:
   - User fills out the donation form (name, email, amount, optional message)
   - Clicks "Donate Now" to trigger Razorpay payment
   - Completes payment through Razorpay's secure checkout
   - Receives instant PDF receipt download

2. **Technical Flow**:
   - Angular handles form validation and UI
   - Razorpay processes the payment securely
   - jsPDF generates a receipt on the client-side
   - No server-side processing required

## Security Notes

- This demo uses client-side order creation for simplicity
- For production use, implement server-side order creation for security
- Never expose live Razorpay keys in client-side code
- Use environment variables for configuration

## Deployment

### Static Hosting (Recommended)

Since this is a client-side only application, you can deploy it to any static hosting service:

- **Vercel**: `npm run build && vercel --prod`
- **Netlify**: Connect your Git repository or drag-and-drop the `dist` folder
- **GitHub Pages**: Use the `ng deploy` command with `angular-cli-ghpages`
- **Firebase Hosting**: `ng build && firebase deploy`

### Traditional Hosting

You can also serve the built files from any web server (Apache, Nginx, etc.)

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

If you encounter any issues or have questions, please check the [Angular documentation](https://angular.io/docs) or [Razorpay documentation](https://razorpay.com/docs/).
