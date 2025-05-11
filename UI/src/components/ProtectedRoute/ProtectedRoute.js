import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { isTokenValid } from '../../utils/jwt-helper';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(null);
  
  useEffect(() => {
    // Check if token is valid
    const authorized = isTokenValid();
    setIsAuthorized(authorized);
    
    if (!authorized) {
      // Redirect after a short delay to show loading state
      const redirectTimer = setTimeout(() => {
        navigate("/v1/login", { 
          state: { 
            from: location.pathname,
            message: "You need to log in to access this page." 
          } 
        });
      }, 100);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [navigate, location.pathname]);
  
  // Initial loading state
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If authorized, render children
  return isAuthorized ? children : null;
}

export default ProtectedRoute