// import { Elements } from '@stripe/react-stripe-js';
// import React, { useEffect, useState } from 'react'
// import CheckoutForm from './CheckoutPayment';
// import { loadStripe } from '@stripe/stripe-js';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from '../../store/features/common';
// import { fetchUserDetails } from '../../api/userInfo';
// import { selectCartItems } from '../../store/features/cart';
// // import Cart from '../Cart/Cart';
// const stripePublishableKey = process.env.STRIPE_KEY || '';
// //Publishable Key
// const stripePromise = loadStripe(stripePublishableKey);

// const PaymentPage = (props) => {

//     const options = {
//         mode: 'payment',
//         amount: 100,
//         currency: 'inr',
//         // Fully customizable with appearance API.
//         appearance: {
//             theme: 'flat'
//         },
//       };
//   return (
//     <div>
//         <Elements stripe={stripePromise} options={options}>
//              <CheckoutForm {...props}/>   
//         </Elements>
//     </div>
//   )
// }

// export default PaymentPage
import React, { useState } from 'react';
// Import icons if you're using a package like react-icons or lucide-react
// If not, you can replace the icon components with simple elements or SVGs

function PaymentPage() {
  // State for form fields
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: '',
    saveCard: false
  });
  
  // State for handling payment submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Handle general input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, '')
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(?=\d)/g, '$1/')
      .slice(0, 5);
  };

  // Handle card number formatting
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setPaymentInfo(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  // Handle expiry date formatting
  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setPaymentInfo(prev => ({ ...prev, expiryDate: formattedValue }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentComplete(true);
    }, 1500);
  };

  // Reset form after payment
  const handleReset = () => {
    setPaymentComplete(false);
    setPaymentInfo({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      email: '',
      saveCard: false
    });
  };

  // Success screen after payment completion
  if (paymentComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {/* Replace with check icon or use ✓ character */}
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your transaction has been processed successfully.</p>
          <button 
            onClick={handleReset}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  // Main payment form
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">PaymentFlow</h1>
          <div className="flex items-center text-sm text-gray-600">
            {/* Replace with lock icon or use 🔒 character */}
            <span className="mr-1">🔒</span>
            Secure Payment
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Order Summary Section */}
              <div className="bg-gray-50 p-6 md:w-1/3">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium">Premium Plan</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">1 Year</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-blue-600">$99.99</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-800 flex items-start">
                    {/* Replace with lock icon or use 🔒 character */}
                    <span className="mr-2">🔒</span>
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
              
              {/* Payment Form Section */}
              <div className="p-6 md:w-2/3 md:border-l border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* Replace with mail icon or use ✉️ character */}
                          <span className="text-gray-400">✉️</span>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={paymentInfo.email}
                          onChange={handleInputChange}
                          required
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* Replace with user icon or use 👤 character */}
                          <span className="text-gray-400">👤</span>
                        </div>
                        <input
                          type="text"
                          id="cardHolder"
                          name="cardHolder"
                          value={paymentInfo.cardHolder}
                          onChange={handleInputChange}
                          required
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* Replace with credit card icon or use 💳 character */}
                          <span className="text-gray-400">💳</span>
                        </div>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          required
                          pattern="[0-9\s]{13,19}"
                          maxLength={19}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {/* Replace with calendar icon or use 📅 character */}
                            <span className="text-gray-400">📅</span>
                          </div>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handleExpiryChange}
                            required
                            pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                            placeholder="MM/YY"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setPaymentInfo(prev => ({ ...prev, cvv: value }));
                          }}
                          required
                          pattern="[0-9]{3,4}"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="saveCard"
                        name="saveCard"
                        type="checkbox"
                        checked={paymentInfo.saveCard}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                        Save card for future payments
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Pay $99.99'
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 flex items-center justify-center">
                  {/* Replace with lock icon or use 🔒 character */}
                  <span className="text-gray-400 mr-2">🔒</span>
                  <span className="text-xs text-gray-500">
                    Secured with 256-bit SSL encryption
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-xs text-gray-500">
            © 2025 PaymentFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PaymentPage;