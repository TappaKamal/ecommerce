import React from 'react';
import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  let errorMessage;
  let errorStatus;
  
  if (isRouteErrorResponse(error)) {
    // If it's a route error (like 404)
    errorStatus = error.status;
    errorMessage = error.statusText || error.data?.message || 'Something went wrong';
  } else if (error instanceof Error) {
    // If it's a JavaScript error
    errorMessage = error.message;
    errorStatus = 'Error';
  } else {
    // Default case
    errorMessage = 'An unexpected error occurred';
    errorStatus = 'Error';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="text-6xl font-extrabold text-indigo-600 mb-2">
              {errorStatus === 404 ? '404' : errorStatus}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {errorStatus === 404 ? 'Page Not Found' : 'An Error Occurred'}
            </h1>
            <p className="text-gray-600 mb-8">
              {errorMessage}
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Home
              </Link>
              
              <Link
                to="/dashboard"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            If you continue to experience issues, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary; 