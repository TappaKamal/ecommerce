import React, { useCallback, useEffect } from "react";
import { logOut } from "../../utils/jwt-helper";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import { loadUserInfo, selectIsUserAdmin, selectUserInfo } from "../../store/features/user";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    logOut();
    navigate('/v1/login');
  }, [navigate]);

  return (
    <div className="p-8">
      {isUserAdmin && (
        <div className="text-right mb-4">
          <Link to={"/admin"} className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-end">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Admin Panel
          </Link>
        </div>
      )}
      
      {userInfo?.email && (
        <>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hello {userInfo?.firstName || 'there'}!</h1>
              <p className="text-gray-600">Welcome to your account dashboard</p>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-3 sm:mt-0 flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sign Out
            </button>
          </div>
          
          <div className="md:flex mt-4">
            <div className="mb-6 md:mb-0 md:w-64 md:mr-8">
              <nav className="bg-white shadow rounded-lg overflow-hidden">
                <NavLink
                  to="/account-details/profile"
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center px-4 py-3 bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700 font-medium" 
                      : "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                  }
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </NavLink>
                <NavLink
                  to="/account-details/orders"
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center px-4 py-3 bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700 font-medium" 
                      : "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                  }
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Orders
                </NavLink>
                <NavLink
                  to="/account-details/settings"
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center px-4 py-3 bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700 font-medium" 
                      : "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                  }
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </NavLink>
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
              </nav>
            </div>
            <div className="flex-1">
              <div className="bg-white shadow rounded-lg p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
