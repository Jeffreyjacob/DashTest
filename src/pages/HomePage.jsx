import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import HomeImageLightBg from '../assets/images/HomeImageLightBg.png';
import HomeImageDarkBg from '../assets/images/HomeImageDarkBg.png';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';


function HomePage({ isDarkMode }) {
    return (
        <div className='flex flex-col-reverse w-full lg:flex-row overflow-hidden'>
              {/**Navbar */}
              <div className='fixed top-0 left-0 right-0'>
                    <Navbar isDarkMode={isDarkMode} />
                </div>

              {/**left column */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className='w-full flex lg:w-1/2 max-lg:h-1/2 dark:text-[#FBFAFC] justify-center items-center text-[#1E1E1E]
                           font-inter lg:px-16 max-lg:px-10 max-lg:pb-14 lg:h-[100vh]'>
                <div>
                    <h1 className='text-[50px] font-[700] leading-[50px]  sm:w-[500px]'>
                        Find a place you will love to live!
                    </h1>

                    <p className='text-[15px] leading-[29.05px] mt-5 sm:w-[500px]'>
                        See through the lenses of people who have
                        lived or visited the neighbourhood you might
                        have in mind.
                    </p>

                    <div className='flex gap-5 w-full dark:bg-[#242428] bg-[#F3F7FE] border-[#D4DCF1] dark:border-none 
                          rounded-md px-[16px] py-[12px] items-center mt-5'>
                        <MagnifyingGlassIcon className='w-[16px] h-[16px] text-[#0D2159] dark:text-[#BACAF5]' />
                        <input placeholder='Enter Address' type='text'
                            className='w-full dark:bg-[#242428] bg-[#F3F7FE] focus:border-none outline-none' />
                    </div>

                    <div className='mt-10'>
                        <button type='button' className='bg-[#3366FF] text-[12px] font-[500] py-[12px] px-[30px] rounded-[6px]'>
                            Search
                        </button>
                    </div>
                </div>

            </motion.div>
            {/**right column */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className='w-full lg:w-1/2 h-1/2 flex justify-center max-lg:px-10 max-lg:pb-7 
             pt-10 max-lg:pt-12'>
                <img src={isDarkMode ? HomeImageDarkBg : HomeImageLightBg}
                    className='max-lg:h-[100%] max-lg:w-[400px] lg:h-[510px] lg:w-[400px]' />
            </motion.div>
        </div>
    )
}

export default HomePage