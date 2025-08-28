import React from 'react'
import { stepsData } from '../assets/assets'

function Steps() {
  return (
    <div className='flex flex-col items-center justify-center
    my-32'>
        <h1 className='text-3xl sm:text-4xl
        font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-gray-600 mb-8'>Transform words 
            into stunning images</p>

        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item, ind)=>(
                <div key={ind}
                className='flex items-center gap-4 p5 px-8 py-6 bg-white/20
                shadow-md border-gray-200 cursor-pointer hover:scale-[1.02]
                transition-all duration-300 rounded-lg'>
                    <img width={40} src={item.icon} alt="" />
                    <div>
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        <p className='text-gray-500'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>

  )
}

export default Steps