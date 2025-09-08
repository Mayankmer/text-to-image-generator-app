import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'motion/react'

function Testimonials() {
  return (
    <motion.div className='flex flex-col items-center justify-center
    my-20 py-12'
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}
    >
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

    </motion.div>
  )
}

export default Testimonials