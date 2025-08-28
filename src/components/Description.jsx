import React from 'react'
import { assets } from '../assets/assets'

function Description() {
  return (
    <div className='flex flex-col items-center justify-center
    my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold ,b-2'>
            Create Images
        </h1>
        <p className='text-gray-500 mb-8'>
            Turn your imagination into visuals
        </p>
        <div className='flex flex-col gap-5 md:gap-14 md:flex-row
        items-center'>
            <img src={assets.sample_img_1} alt="" className='w-80
            xl:w-96 rounded-lg'/>
            <div className='text-left'>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered text to image generator</h2>
            <p className='text-gray-600 mb-4'>Turn your ideas into art, instantly. 
                Whether you're a writer looking to illustrate your story,
                 a designer seeking inspiration, or just a curious mind, 
                 our text-to-image app provides a seamless and magical experience. 
                 Just describe your vision, and in moments, 
                you'll have a unique piece of visual art that was born from your words alone.</p>
                </div>
        </div>
    </div>
  )
}

export default Description