import React from 'react'
import { Link } from 'react-router-dom'

import HeroImg2 from "../../assets/img/NewUpdate_DesktopHeroTemplate_3000x1200_ref._CB550300935_.jpg"


const HeroSection = () => {
  return (
    <div className='relative flex items-center bg-cover bg-center text-left h-[90vh] w-full overflow-hidden shadow-xl' style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroImg2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent'></div>
      <div className='container mx-auto px-6 lg:px-16 relative z-10'>
        <div className='max-w-2xl'>
          <div className='text-left mb-6'>
            <span className='inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full mb-5 text-sm tracking-wide font-medium'>NEW SUMMER COLLECTION</span>
            <h2 className='text-2xl font-light text-white/90 mb-3'>Premium Quality</h2>
          </div>
          <h1 className='text-6xl md:text-7xl font-bold tracking-tight leading-tight text-white'>
            Summer<br />
            <span className='text-yellow-400 drop-shadow-md'>Value Pack</span>
          </h1>
          <p className='mt-6 mb-8 text-white/90 text-xl font-light tracking-wide max-w-xl'>
            cool / colorful / comfy
          </p>
          <div className='relative flex space-x-4'>
            <button className='relative overflow-hidden group mt-2 border-2 rounded-full px-10 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 w-auto h-14 font-medium flex items-center justify-center'>
              <span className='z-10 group-hover:text-black transition-colors duration-300 flex items-center'>
                Shop Now
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <div className='absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-300 ease-out'></div>
            </button>

            <Link to="/mock-login" className='relative overflow-hidden group mt-2 border-2 rounded-full px-10 border-indigo-400 text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 w-auto h-14 font-medium flex items-center justify-center'>
              <span className='z-10 flex items-center'>
                Dashboard Demo
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Design elements */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="w-24 h-24 rounded-full border-4 border-white/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white/90 text-xl font-bold">50% OFF</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection