import React from 'react'
import FbIcon from '../common/FbIcon'
import InstaIcon from '../common/InstaIcon'

const Footer = ({ content }) => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {content?.items && content?.items?.map((item, index) => (
            <div key={index} className='flex flex-col space-y-4'>
              <h3 className='text-lg font-semibold text-white'>{item?.title}</h3>
              {item?.list && item?.list?.map((listItem, index) => (
                <a 
                  key={index}
                  className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'
                  href={listItem?.path}
                >
                  {listItem?.label}
                </a>
              ))}
              {item?.description && <p className='text-gray-300 text-sm'>{item?.description}</p>}
            </div>
          ))}
        </div>
        
        <div className='mt-12 border-t border-gray-800 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center mb-4 md:mb-0'>
              <span className='text-2xl font-bold'>
                <span className='text-white'>Shop</span>
                <span className='text-indigo-400'>Ease</span>
              </span>
            </div>
            
            <div className='flex space-x-6 items-center'>
              <a href='/fb' className='text-gray-400 hover:text-white transition-colors duration-200'>
                <FbIcon />
              </a>
              <a href='/insta' className='text-gray-400 hover:text-white transition-colors duration-200'>
                <InstaIcon />
              </a>
            </div>
          </div>
          
          <div className='mt-8 md:flex md:items-center md:justify-between'>
            <div className='text-sm text-gray-400'>
              © {new Date().getFullYear()} ShopEase. All rights reserved.
            </div>
            
            <div className='mt-4 md:mt-0 flex flex-wrap space-x-6'>
              <a href='#' className='text-gray-400 hover:text-white text-sm'>
                Privacy Policy
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm'>
                Terms of Service
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm'>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer