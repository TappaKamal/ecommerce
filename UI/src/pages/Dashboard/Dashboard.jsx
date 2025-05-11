import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Enhanced mock data for dashboard
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '15 May 2023',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    membership: 'Premium'
  });

  const [stats, setStats] = useState({
    orders: 12,
    wishlist: 24,
    reviews: 8,
    points: 750,
    wallet: 125.45
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'ORD-9821',
      date: '28 Jun 2023',
      status: 'Delivered',
      total: '$189.99',
      items: 4,
      tracking: 'UPS12345678'
    },
    {
      id: 'ORD-7893',
      date: '12 Jun 2023',
      status: 'Delivered',
      total: '$139.50',
      items: 3,
      tracking: 'FDX87654321'
    },
    {
      id: 'ORD-6547',
      date: '28 May 2023',
      status: 'Processing',
      total: '$89.99',
      items: 1,
      tracking: 'Pending'
    },
    {
      id: 'ORD-5324',
      date: '15 May 2023',
      status: 'Cancelled',
      total: '$214.30',
      items: 4,
      tracking: 'N/A'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Your order ORD-9821 has been delivered',
      time: '2 hours ago',
      read: false,
      type: 'order'
    },
    {
      id: 2,
      message: 'Summer sale starts today! Up to 50% off',
      time: '1 day ago',
      read: true,
      type: 'promotion'
    },
    {
      id: 3, 
      message: 'Your review for Premium Cotton T-Shirt has been posted',
      time: '3 days ago',
      read: true,
      type: 'review'
    }
  ]);

  const [recommendedProducts, setRecommendedProducts] = useState([
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: '$24.99',
      originalPrice: '$32.99',
      discount: '25%',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: '$49.99',
      originalPrice: '$49.99',
      discount: null,
      rating: 4.2,
      reviews: 86
    },
    {
      id: 3,
      name: 'Classic Leather Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: '$129.99',
      originalPrice: '$169.99',
      discount: '20%',
      rating: 4.9,
      reviews: 231
    },
    {
      id: 4,
      name: 'Casual Sneakers',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: '$79.99',
      originalPrice: '$89.99',
      discount: '10%',
      rating: 4.5,
      reviews: 178
    }
  ]);

  const [recentlyViewed, setRecentlyViewed] = useState([
    {
      id: 5,
      name: 'Smart Fitness Watch',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: '$89.99',
      category: 'Accessories'
    },
    {
      id: 6,
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: '$129.99',
      category: 'Electronics'
    },
    {
      id: 7,
      name: 'Formal Business Shirt',
      image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: '$59.99',
      category: 'Men'
    }
  ]);

  const statusColors = {
    'Delivered': 'bg-green-100 text-green-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  const notificationIcons = {
    'order': (
      <div className="flex-shrink-0 rounded-full p-2 bg-green-100">
        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    ),
    'promotion': (
      <div className="flex-shrink-0 rounded-full p-2 bg-yellow-100">
        <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
        </svg>
      </div>
    ),
    'review': (
      <div className="flex-shrink-0 rounded-full p-2 bg-indigo-100">
        <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
      </div>
    )
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Welcome Banner */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img 
                  src={userData.profileImage} 
                  alt="Profile" 
                  className="h-14 w-14 rounded-full object-cover border-2 border-indigo-300"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Welcome back, {userData.name}!</h1>
                <p className="mt-1 text-indigo-200">{userData.membership} Member • Joined {userData.joinDate}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link 
                to="/account-details/profile" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50"
              >
                Manage Profile
              </Link>
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats and Quick Links */}
          <div className="lg:col-span-1 space-y-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Your Activity</h3>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-200">
                <div className="p-6 text-center">
                  <span className="text-3xl font-bold text-indigo-600">{stats.orders}</span>
                  <p className="mt-1 text-sm text-gray-500">Orders</p>
                </div>
                <div className="p-6 text-center">
                  <span className="text-3xl font-bold text-indigo-600">{stats.wishlist}</span>
                  <p className="mt-1 text-sm text-gray-500">Wishlist</p>
                </div>
                <div className="p-6 text-center">
                  <span className="text-3xl font-bold text-indigo-600">{stats.reviews}</span>
                  <p className="mt-1 text-sm text-gray-500">Reviews</p>
                </div>
                <div className="p-6 text-center">
                  <span className="text-3xl font-bold text-indigo-600">{stats.points}</span>
                  <p className="mt-1 text-sm text-gray-500">Points</p>
                </div>
              </div>
              <div className="bg-indigo-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Wallet Balance</span>
                    <p className="text-xl font-bold text-indigo-600">${stats.wallet}</p>
                  </div>
                  <button className="inline-flex items-center px-3 py-1.5 border border-indigo-600 rounded-full text-xs font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                    Add Funds
                  </button>
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Mark all as read
                </button>
              </div>
              <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`px-6 py-4 flex ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}>
                      {notificationIcons[notification.type]}
                      <div className="ml-4 flex-1">
                        <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <span className="flex-shrink-0 h-2 w-2 rounded-full bg-indigo-600"></span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-center text-gray-500 text-sm">
                    No new notifications
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-4 text-center">
                <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  View all notifications
                </Link>
              </div>
            </div>
            
            {/* Recently Viewed */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recently Viewed</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentlyViewed.map(product => (
                  <div key={product.id} className="p-4 flex hover:bg-gray-50">
                    <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                      <p className="mt-1 text-sm font-semibold text-indigo-600">{product.price}</p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <button className="text-gray-400 hover:text-indigo-600">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <Link 
                  to="/account-details/orders" 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View All
                </Link>
              </div>
              
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/account-details/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Recommended Products */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recommended For You</h3>
                <Link
                  to="/" 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Shop All
                </Link>
              </div>
              
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discount} OFF
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-center">
                          <button className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full shadow-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                          </button>
                          <button className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full shadow-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                      <div className="mt-1 flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <svg key={rating} className={`w-4 h-4 ${
                              product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                            }`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="ml-1 text-xs text-gray-500">({product.reviews})</p>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                        {product.discount && (
                          <span className="ml-2 text-xs text-gray-500 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Special Offers Banner */}
            <div className="relative bg-gradient-to-r from-indigo-700 to-purple-600 rounded-xl shadow-md overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" fill="none" />
                      <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
              </div>
              <div className="relative px-6 py-8 sm:px-12 sm:py-10">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Summer Sale is LIVE!</h3>
                    <p className="mt-2 text-indigo-100 max-w-xl">
                      Enjoy up to 50% off on selected summer collection. Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">SUMMER23</span> at checkout.
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-6">
                    <Link
                      to="/men"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    >
                      Shop Now
                      <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;