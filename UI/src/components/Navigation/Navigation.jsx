import React, { useState, useEffect } from 'react'
import { Wishlist } from '../common/Wishlist'
import { AccountIcon } from '../common/AccountIcon'
import { CartIcon } from '../common/CartIcon'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import './Navigation.css';
import { useSelector } from 'react-redux'
import { countCartItems } from '../../store/features/cart'
import { isTokenValid, logOut } from '../../utils/jwt-helper'

const Navigation = ({variant="default"}) => {
  const cartLength = useSelector(countCartItems);
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status
  useEffect(() => {
    setIsLoggedIn(isTokenValid());
  }, [location.pathname]);

  // Add scroll event listener to change nav style when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    logOut();
    setIsLoggedIn(false);
    navigate('/v1/login');
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <div className='flex items-center'>
            {/* Logo */}
            <a className='text-3xl font-bold flex items-center group' href='/'>
              <span className='text-black transition-colors duration-300 group-hover:text-indigo-700'>Shop</span>
              <span className='text-indigo-600 transition-colors duration-300 group-hover:text-indigo-800'>Ease</span>
            </a>
          </div>
          
          {/* Desktop menu */}
          { variant === "default" &&
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-10'>
                <NavLink to='/' className={({isActive}) => 
                  isActive ? 'text-indigo-600 border-b-2 border-indigo-600 px-1 py-2 font-medium transition-colors' 
                  : 'text-gray-600 hover:text-indigo-600 px-1 py-2 font-medium transition-colors hover:border-b-2 hover:border-indigo-300'}>
                  Shop
                </NavLink>
                <NavLink to='/men' className={({isActive}) => 
                  isActive ? 'text-indigo-600 border-b-2 border-indigo-600 px-1 py-2 font-medium transition-colors' 
                  : 'text-gray-600 hover:text-indigo-600 px-1 py-2 font-medium transition-colors hover:border-b-2 hover:border-indigo-300'}>
                  Men
                </NavLink>
                <NavLink to='/women' className={({isActive}) => 
                  isActive ? 'text-indigo-600 border-b-2 border-indigo-600 px-1 py-2 font-medium transition-colors' 
                  : 'text-gray-600 hover:text-indigo-600 px-1 py-2 font-medium transition-colors hover:border-b-2 hover:border-indigo-300'}>
                  Women
                </NavLink>
                <NavLink to='/kids' className={({isActive}) => 
                  isActive ? 'text-indigo-600 border-b-2 border-indigo-600 px-1 py-2 font-medium transition-colors' 
                  : 'text-gray-600 hover:text-indigo-600 px-1 py-2 font-medium transition-colors hover:border-b-2 hover:border-indigo-300'}>
                  Kids
                </NavLink>
                <NavLink to='/mock-login' className={({isActive}) => 
                  isActive ? 'text-indigo-600 border-b-2 border-indigo-600 px-1 py-2 font-medium transition-colors' 
                  : 'text-gray-600 hover:text-indigo-600 px-1 py-2 font-medium transition-colors hover:border-b-2 hover:border-indigo-300'}>
                  Dashboard Demo
                </NavLink>
                {isLoggedIn && (
                  <NavLink to='/dashboard' className={({isActive}) => 
                    isActive ? 'text-indigo-600 border-b-2 border-indigo-600 px-1 py-2 font-medium transition-colors' 
                    : 'text-gray-600 hover:text-indigo-600 px-1 py-2 font-medium transition-colors hover:border-b-2 hover:border-indigo-300'}>
                    Dashboard
                  </NavLink>
                )}
              </div>
            </div>
          }
          
          {/* Search and icons */}
          <div className='hidden md:flex items-center space-x-6'>
            { variant === "default" &&
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                  </svg>
                </div>
                <input 
                  type='text' 
                  className='pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64 bg-gray-50 hover:bg-white transition-colors'
                  placeholder='Search for products...'
                />
              </div>
            }
            
            { variant === "default" &&
              <div className='flex items-center space-x-7'>
                <button className='text-gray-500 hover:text-indigo-600 transition-colors relative w-6 h-6 flex items-center justify-center'>
                  <Wishlist />
                  <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
                </button>
                {isLoggedIn ? (
                  <>
                    <button onClick={() => navigate('/account-details/profile')} className='text-gray-500 hover:text-indigo-600 transition-colors w-6 h-6 flex items-center justify-center'>
                      <AccountIcon />
                    </button>
                    <button onClick={handleLogout} className='text-gray-500 hover:text-indigo-600 transition-colors'>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <Link to="/v1/login" className='text-gray-500 hover:text-indigo-600 transition-colors'>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </Link>
                )}
                <Link to='/cart-items' className='relative text-gray-500 hover:text-indigo-600 transition-colors w-6 h-6 flex items-center justify-center'>
                  <CartIcon />
                  {cartLength > 0 && <div className='absolute -top-1.5 -right-1.5 inline-flex items-center justify-center h-5 w-5 bg-indigo-600 text-white rounded-full text-xs'>{cartLength}</div>}
                </Link>
              </div>
            }
            
            { variant === "auth" &&
              <div className='flex items-center space-x-4'>
                <NavLink 
                  to='/v1/login' 
                  className={({isActive}) => 
                    isActive ? 'text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm' 
                    : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 px-5 py-2.5 rounded-full font-medium transition-colors'
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to='/v1/register' 
                  className={({isActive}) => 
                    isActive ? 'text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm' 
                    : 'text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm'
                  }
                >
                  Sign Up
                </NavLink>
              </div>
            }
          </div>
          
          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            { variant === "default" &&
              <>
                {isLoggedIn && (
                  <button onClick={handleLogout} className='text-gray-500 hover:text-indigo-600 transition-colors mr-4'>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                )}
                <Link to='/cart-items' className='relative text-gray-500 hover:text-indigo-600 transition-colors mr-5'>
                  <CartIcon />
                  {cartLength > 0 && <div className='absolute -top-1.5 -right-1.5 inline-flex items-center justify-center h-5 w-5 bg-indigo-600 text-white rounded-full text-xs'>{cartLength}</div>}
                </Link>
              </>
            }
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none'
              aria-expanded="false"
            >
              <span className="sr-only">{showMobileMenu ? 'Close menu' : 'Open menu'}</span>
              <svg 
                className={`${showMobileMenu ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns='http://www.w3.org/2000/svg' 
                fill='none' 
                viewBox='0 0 24 24' 
                stroke='currentColor'
                aria-hidden="true"
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              <svg 
                className={`${showMobileMenu ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns='http://www.w3.org/2000/svg' 
                fill='none' 
                viewBox='0 0 24 24' 
                stroke='currentColor'
                aria-hidden="true"
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`${showMobileMenu ? 'block' : 'hidden'} md:hidden bg-white shadow-lg pb-6 absolute w-full left-0 right-0 z-10 transition-transform duration-300 ease-in-out ${showMobileMenu ? 'translate-y-0' : '-translate-y-full'}`}
      >
        { variant === "default" && (
          <>
            <div className='px-4 pt-4 pb-3'>
              <div className='relative mb-6'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                  </svg>
                </div>
                <input 
                  type='text' 
                  className='pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full'
                  placeholder='Search for products...'
                />
              </div>

              <div className='flex flex-col space-y-2'>
                <NavLink 
                  to='/' 
                  className={({isActive}) => 
                    isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                  }
                >
                  Shop
                </NavLink>
                <NavLink 
                  to='/men' 
                  className={({isActive}) => 
                    isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                  }
                >
                  Men
                </NavLink>
                <NavLink 
                  to='/women' 
                  className={({isActive}) => 
                    isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                  }
                >
                  Women
                </NavLink>
                <NavLink 
                  to='/kids' 
                  className={({isActive}) => 
                    isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                  }
                >
                  Kids
                </NavLink>
                <NavLink 
                  to='/mock-login' 
                  className={({isActive}) => 
                    isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                  }
                >
                  Dashboard Demo
                </NavLink>
                {isLoggedIn && (
                  <NavLink 
                    to='/dashboard' 
                    className={({isActive}) => 
                      isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                    }
                  >
                    Dashboard
                  </NavLink>
                )}
                
                {isLoggedIn ? (
                  <NavLink
                    to='/account-details/profile'
                    className={({isActive}) => 
                      isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                    }
                  >
                    My Account
                  </NavLink>
                ) : (
                  <NavLink
                    to='/v1/login'
                    className={({isActive}) => 
                      isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                    }
                  >
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </>
        )}
        
        { variant === "auth" && (
          <div className='px-4 pt-4 pb-3'>
            <div className='flex flex-col space-y-2'>
              <NavLink 
                to='/v1/login' 
                className={({isActive}) => 
                  isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                }
              >
                Login
              </NavLink>
              <NavLink 
                to='/v1/register' 
                className={({isActive}) => 
                  isActive ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50 pl-3 pr-4 py-3 font-medium' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 pl-3 pr-4 py-3 font-medium'
                }
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation