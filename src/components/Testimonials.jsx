import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

function Testimonials() {
  return (
    <div className='flex flex-col items-center justify-center
    my-20 py-12'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
            Customer Testimonials
        </h1>
        <p className='text-gray-500 mb-12'>
            What our users are saying
        </p>
        <div className='flex flex-wrap gap-6'>
            {testimonialsData.map((test, ind)=>(
                <div key={ind} className='bg-white/20 p-12 rounded-lg
                shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02]'>
                    <div>
                        <img src={test.image} alt="" 
                        className='rounded-full w-14'/>
                        <h2 className='text-xl font-semibold mt-3'>{test.name}</h2>
                        <p className='text-gray-500 mb-4'>{test.role}</p>
                        <div className='flex mb-4'>
                            {Array(test.stars).fill().map((item, ind)=>(
                                <img key={ind} src={assets.rating_star} alt="" />
                            ))} 
                        </div>
                        <p className='text-center text-sm text-gray-600'>{test.text}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Testimonials