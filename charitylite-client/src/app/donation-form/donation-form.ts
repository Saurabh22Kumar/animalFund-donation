import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { environment } from '../../environments/environment';

// Declare Razorpay as a global variable
declare var Razorpay: any;

@Component({
  selector: 'app-donation-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './donation-form.html',
  styleUrl: './donation-form.css'
})
export class DonationForm {
  // Form model
  donationModel = {
    name: '',
    email: '',
    amount: null as number | null,
    message: ''
  };

  // Quick amount options
  quickAmounts = [500, 1000, 2500, 5000, 10000];

  // Success message
  paymentSuccess = false;
  transactionId = '';

  // Payment processing flag
  processing = false;

  // Environment configuration
  private config = environment;

  // Math reference for template
  Math = Math;

  // Test card numbers for development/testing
  // These work with test keys and no money is deducted
  private testCards = {
    visa: '4111111111111111',
    mastercard: '5555555555554444',
    rupay: '6070000000000007',
    cvv: '123',
    expiry: '12/25'
  };

  constructor() {}

  selectAmount(amount: number) {
    this.donationModel.amount = amount;
  }

  shareSuccess() {
    const text = `I just donated ₹${this.donationModel.amount} to ${this.config.app.name}! Join me in making a difference. 💝`;
    if (navigator.share) {
      navigator.share({
        title: 'Donation Success',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Message copied to clipboard!');
      });
    }
  }

  donate() {
    if (!this.donationModel.amount || this.donationModel.amount <= 0) {
      return;
    }

    this.processing = true;

    const options = {
      key: this.config.razorpay.keyId,
      amount: this.donationModel.amount * 100, // Razorpay expects amount in paise
      currency: this.config.razorpay.currency,
      name: this.config.razorpay.name,
      description: this.config.razorpay.description,
      image: this.config.razorpay.image,
      handler: (response: any) => {
        this.processing = false;
        this.paymentSuccess = true;
        this.transactionId = response.razorpay_payment_id;
        console.log('Payment successful:', response);
        this.generateReceipt(response.razorpay_payment_id);
      },
      prefill: {
        name: this.donationModel.name,
        email: this.donationModel.email,
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true
      },
      theme: this.config.razorpay.theme,
      modal: {
        ondismiss: () => {
          this.processing = false;
          console.log('Payment window dismissed');
        },
        escape: false,  // Prevent accidental closure
        confirm_close: false
      },
      // Enable test mode specific features
      config: {
        display: {
          blocks: {
            upi: {
              name: 'Pay by UPI',
              instruments: [
                {
                  method: 'upi',
                  flows: ['collect', 'intent']
                }
              ]
            },
            card: {
              name: 'Credit/Debit Cards'
            },
            netbanking: {
              name: 'Net Banking'
            },
            wallet: {
              name: 'Wallets'
            }
          },
          hide: [
            {
              method: 'paylater'
            }
          ]
        }
      }
    };

    try {
      const rzp = new Razorpay(options);
      
      // Add error handling
      rzp.on('payment.failed', (response: any) => {
        this.processing = false;
        console.log('Payment failed:', response);
        alert(`Payment failed: ${response.error.description}`);
      });
      
      rzp.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      this.processing = false;
      alert('Payment gateway error. Please try again.');
    }
  }

  generateReceipt(paymentId: string) {
    const doc = new jsPDF();
    
    // Set font to support Unicode characters better
    doc.setFont("helvetica");
    
    // Add logo or header
    doc.setFontSize(22);
    doc.setTextColor(33, 37, 41);
    doc.text(this.config.app.name, 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('Donation Receipt', 105, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(73, 80, 87);
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-IN');
    doc.text(`Date: ${dateStr}`, 20, 45);
    doc.text(`Receipt No: ${paymentId.substring(0, 8).toUpperCase()}`, 20, 55);
    
    // Add donor information
    doc.setTextColor(33, 37, 41);
    doc.setFontSize(14);
    doc.text('Donor Information', 20, 70);
    
    doc.setFontSize(12);
    doc.text(`Name: ${this.donationModel.name}`, 20, 80);
    doc.text(`Email: ${this.donationModel.email}`, 20, 90);
    
    // Add donation details
    doc.setFontSize(14);
    doc.text('Donation Details', 20, 110);
    
    doc.setFontSize(12);
    // Use 'INR' instead of rupee symbol for better PDF compatibility
    doc.text(`Amount: INR ${this.donationModel.amount}`, 20, 120);
    doc.text(`Payment ID: ${paymentId}`, 20, 130);
    if (this.donationModel.message) {
      // Handle long messages by wrapping text
      const splitMessage = doc.splitTextToSize(`Message: ${this.donationModel.message}`, 170);
      doc.text(splitMessage, 20, 140);
    }
    
    // Add thank you message
    doc.setFontSize(13);
    doc.setTextColor(40, 167, 69);
    doc.text('Thank you for your generous donation!', 105, 170, { align: 'center' });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    doc.text(`${this.config.app.name} - Making a difference together`, 105, 180, { align: 'center' });
    doc.text(`© 2025 ${this.config.app.name}. All rights reserved.`, 105, 185, { align: 'center' });
    
    // Save the PDF
    const fileName = `${this.config.app.name}-Donation-Receipt-${new Date().getTime()}.pdf`;
    doc.save(fileName);
  }

  resetForm() {
    this.paymentSuccess = false;
    this.transactionId = '';
    this.donationModel = {
      name: '',
      email: '',
      amount: null,
      message: ''
    };
  }

  // Show test credentials to user (for development)
  showTestCredentials() {
    const testInfo = `
🧪 TEST MODE - NO REAL MONEY WILL BE CHARGED! 🧪

📋 TEST CARD NUMBERS:
• Visa: ${this.testCards.visa}
• Mastercard: ${this.testCards.mastercard}
• RuPay: ${this.testCards.rupay}
• CVV: Any 3 digits (e.g., ${this.testCards.cvv})
• Expiry: Any future date (e.g., ${this.testCards.expiry})

🏦 NET BANKING:
• Select any bank and use dummy credentials
• Or use test login details

💳 WALLETS:
• All major wallets work in test mode
• Use dummy credentials

🔐 SECURITY NOTES:
• This is Razorpay's official test environment
• No real transactions are processed
• Test mode accepts invalid credentials gracefully
• All test payments will show as successful in logs

⚠️ Remember: Switch to live keys for production!
    `;
    
    // Create a better formatted alert
    if (confirm(testInfo + '\n\nClick OK to copy test card number to clipboard, or Cancel to close.')) {
      navigator.clipboard.writeText(this.testCards.visa).then(() => {
        alert('✅ Test card number copied to clipboard!');
      }).catch(() => {
        alert('❌ Could not copy to clipboard. Card number: ' + this.testCards.visa);
      });
    }
  }
}
