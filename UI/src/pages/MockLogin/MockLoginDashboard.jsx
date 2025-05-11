import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { saveToken } from '../../utils/jwt-helper';

const MockLoginDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'demo@example.com',
    joinDate: '15 May 2023',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    membership: 'Premium'
  };

  const handleMockLogin = () => {
    dispatch(setLoading(true));
    
    // Simulate network delay
    setTimeout(() => {
      // Save mock token
      saveToken('mock-jwt-token');
      setIsLoggedIn(true);
      dispatch(setLoading(false));
      
      // Navigate to dashboard
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to ShopEase</h1>
        <p className="mt-2 text-gray-600">Click the button below to sign in with mock credentials</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6 w-full">
          <div className="flex items-center mb-2">
            <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-gray-700">Mock credentials:</span>
          </div>
          <div className="pl-7">
            <p><span className="font-medium">Email:</span> demo@example.com</p>
            <p><span className="font-medium">Password:</span> password</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-4 w-full">
          <button 
            onClick={handleMockLogin}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors font-medium flex items-center justify-center"
          >
            <span>Sign In with Mock Credentials</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          {isLoggedIn && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 w-full text-center">
              <p className="text-green-700">
                Successfully logged in! Redirecting to dashboard...
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">What's on the Dashboard?</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            User profile information
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Order history and status
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Personalized recommendations
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Account statistics and rewards
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MockLoginDashboard; 