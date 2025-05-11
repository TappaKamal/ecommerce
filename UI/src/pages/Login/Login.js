import React, { useCallback, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common'
import { loginAPI } from '../../api/authentication';
import { saveToken } from '../../utils/jwt-helper';

const Login = () => {
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if redirected from a protected route
  useEffect(() => {
    if (location.state?.message) {
      setRedirectMessage(location.state.message);
    }
  }, [location.state]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    setRedirectMessage('');
    dispatch(setLoading(true));
    
    // For demo purposes, we'll use mock credentials - in production, this would call the API
    if (values.userName === 'demo@example.com' && values.password === 'password') {
      // Simulate successful login
      setTimeout(() => {
        // Save a mock token for our demo
        saveToken('mock-jwt-token');
        dispatch(setLoading(false));
        
        // Always redirect to dashboard after successful login
        navigate('/dashboard');
      }, 800); // simulate network delay
    } else {
      // Show error for invalid credentials
      setTimeout(() => {
        setError("Invalid email or password. Try demo@example.com / password");
        dispatch(setLoading(false));
      }, 800);
    }
    
    // In a real app, would call the API instead of the code above:
    // loginAPI(values).then(res => {
    //   if (res?.token) {
    //     saveToken(res.token);
    //     navigate('/dashboard')
    //   } else {
    //     setError("Something went wrong!");
    //   }
    // }).catch(err => {
    //   setError("Invalid Credentials!");
    // }).finally(() => {
    //   dispatch(setLoading(false));
    // });
  }, [dispatch, navigate, values, location.state]);

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target?.value,
    }))
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='lg:w-[500px] md:w-[90%] w-full px-6 py-8 mx-auto bg-white rounded-xl shadow-lg border border-gray-100'>
      <div className="mb-8 text-center">
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h2>
        <p className="text-gray-500">Sign in to your account to continue</p>
      </div>

      {redirectMessage && (
        <div className="mb-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-700">{redirectMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-center space-x-6">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M23.05 12c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H6.078V12h3.047V9.356c0-3.007 1.79-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H14.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C18.612 22.954 23.05 17.99 23.05 12z" />
            </svg>
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-400">or continue with email</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                id="email"
                type="email" 
                name='userName' 
                value={values?.userName} 
                onChange={handleOnChange} 
                placeholder='Enter your email' 
                className='h-[48px] w-full border pl-10 p-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' 
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="#" className='text-sm text-indigo-600 hover:text-indigo-800 transition-colors'>Forgot Password?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                id="password"
                type={showPassword ? "text" : "password"}
                name='password' 
                value={values?.password} 
                onChange={handleOnChange} 
                placeholder='Enter your password' 
                className='h-[48px] w-full border pl-10 pr-10 p-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' 
                required 
                autoComplete='current-password'
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button 
            type="submit"
            className='w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors font-medium flex items-center justify-center'
          >
            <span>Sign In</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <div className="text-sm text-center mt-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
            <span className="font-medium text-gray-700">Demo credentials:</span> 
            <span className="font-medium text-indigo-600 ml-1">demo@example.com / password</span>
          </div>
        </form>
      </div>

      {error && <div className='mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100'>{error}</div>}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/v1/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
