import React from 'react'
import ArrowIcon from '../common/ArrowIcon'

const Card = ({imagePath, title, description, actionArrow, height, width, onClick, price}) => {
  return (
    <div 
      className='group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white transform hover:-translate-y-1'
      onClick={onClick}
    >
      <div className='overflow-hidden aspect-w-3 aspect-h-4'>
        <img 
          className='w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110'
          src={imagePath} 
          alt={title}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        
        {/* Quick action buttons that appear on hover */}
        <div className='absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300'>
          <button className='bg-white text-gray-800 rounded-full h-10 w-10 flex items-center justify-center mx-1 shadow-md hover:bg-indigo-600 hover:text-white transition-colors'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </button>
          <button className='bg-white text-gray-800 rounded-full h-10 w-10 flex items-center justify-center mx-1 shadow-md hover:bg-indigo-600 hover:text-white transition-colors'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className='p-4'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1'>{title}</h3>
            {description && 
              <p className='mt-1 text-sm text-gray-500 line-clamp-2'>{description}</p>
            }
            {price && <p className="mt-2 font-semibold text-indigo-600">{price}</p>}
          </div>
          {actionArrow && 
            <span className='text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1'>
              <ArrowIcon />
            </span>
          }
        </div>
      </div>
      
      <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-sm hover:bg-indigo-600 hover:text-white'>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      {/* Sale badge */}
      <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-md shadow-sm">
        NEW
      </div>
    </div>
  )
}

export default Card