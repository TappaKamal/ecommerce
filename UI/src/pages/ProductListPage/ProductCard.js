import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({id, title, description, price, discount, rating, brand, thumbnail, slug}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);

  const stars = Array(5).fill(0).map((_, index) => {
    const filled = index < Math.floor(rating || 0);
    return (
      <svg 
        key={index}
        className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
  });

  return (
    <div className="group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-w-1 aspect-h-1">
        <Link to={`/product/${slug}`}>
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
        </Link>
        <button className="absolute right-2 top-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${slug}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors truncate">
            {title}
          </h3>
          {brand && (
            <p className="text-xs text-gray-500 mb-2">
              {brand}
            </p>
          )}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {stars}
            </div>
            {rating && (
              <span className="text-xs text-gray-500 ml-1">
                ({rating.toFixed(1)})
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-900">
              {formattedPrice}
            </p>
            {discount && (
              <p className="text-xs text-gray-500 line-through">
                ${(price + (price * discount / 100)).toFixed(2)}
              </p>
            )}
          </div>
        </Link>
        
        <div className="mt-3">
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard