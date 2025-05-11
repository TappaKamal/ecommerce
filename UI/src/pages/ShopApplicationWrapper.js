import React, { useEffect } from 'react'
import Navigation from '../components/Navigation/Navigation'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer/Footer'

const ShopApplicationWrapper = () => {
  const isLoading = useSelector((state) => state?.commonState?.loading);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle any route errors
  useEffect(() => {
    const handleRouteError = (event) => {
      // Prevent the default behavior
      event.preventDefault();
      
      // Get the error from the event
      const error = event.error || new Error('An unknown error occurred');
      
      console.error('Route Error:', error);
      
      // Navigate to error page
      navigate('/error', { 
        state: { 
          errorMessage: error.message,
          errorStack: error.stack 
        },
        replace: true
      });
    };

    // Add event listener
    window.addEventListener('error', handleRouteError);
    
    // Clean up
    return () => {
      window.removeEventListener('error', handleRouteError);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer content={{
        items: [
          {
            title: "Help",
            list: [
              { label: "Customer Service", path: "#" },
              { label: "Track Order", path: "#" },
              { label: "Returns & Exchanges", path: "#" },
              { label: "Shipping", path: "#" },
              { label: "Contact Us", path: "#" }
            ]
          },
          {
            title: "Shop",
            list: [
              { label: "Men's", path: "/men" },
              { label: "Women's", path: "/women" },
              { label: "Kids", path: "/kids" },
              { label: "Accessories", path: "#" },
              { label: "Sale", path: "#" }
            ]
          },
          {
            title: "About",
            list: [
              { label: "Our Story", path: "#" },
              { label: "Careers", path: "#" },
              { label: "Corporate Responsibility", path: "#" },
              { label: "News", path: "#" }
            ]
          },
          {
            title: "Legal",
            list: [
              { label: "Terms of Use", path: "#" },
              { label: "Privacy Policy", path: "#" },
              { label: "Cookie Policy", path: "#" }
            ]
          }
        ]
      }} />
      {isLoading && <Spinner />}
    </div>
  )
}

export default ShopApplicationWrapper