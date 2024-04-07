import React, { useEffect, useState } from 'react'
import lightThemeLogo from '../assets/images/lightLogo.png';
import darkThemeLogo from '../assets/images/darkLogo.png';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Avatar } from 'rsuite';
import profilePicture from '../assets/images/profilePicture.png';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { categories } from '../assets/data/category';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';

function Navbar({Searchbar, SearchInfo, reviewnumber,setOpenReview}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [showDisplayInfo, setShowDisplayInfo] = useState(false);
    const [seacrh, setSearch] = useState('Bonny and Clyde Street, Ajao Estate, Lagos');

   const openReviewHandle = ()=>{
       setOpenReview(true)
   }

    useEffect(() => {
        const OnAuthChange = () => {
            auth.onAuthStateChanged((userAuth) => {
                if (userAuth) {
                    setUsername(userAuth.displayName);
                    setShowDisplayInfo(true);
                } else {

                }
            })
        }
        OnAuthChange();
    }, [auth])
    const logOutFunc = () => {
        auth.signOut()
    }
    const searchHandle = (event) => {
        setSearch(event.target.value);

    }
    return (
        <div className=' bg-[#F2F6FD] dark:bg-[#171717] text-[#1E1E1E] dark:text-[#FBFAFC] 
        font-inter lg:px-16 py-5 max-lg:px-6'>
            <div className='flex justify-between  gap-4'>
                <div className='flex max-sm:flex-col flex-row'>

                    {/**Logo */}
                    <div className='flex gap-2'>
                        <span className='text-[#101012] dark:text-[#FBFAFC] text-[10px] leading-[12.3px] font-[700]'>
                            Spotta
                        </span>
                        <span className='text-white text-[7px] font-[600] leading-[8.61px]
                        bg-[#5378F6] w-[19px] h-[13px] rounded-[2px] px-[4px] py-[2px]'>
                            NG
                        </span>
                    </div>

                    {/**search bar */}
                    {
                        Searchbar && (
                            <div className="w-full lg:w-[778px] max-sm:mt-10 sm:ml-16 lg:ml-20">
                                <div className='bg-[#FBFAFC] dark:bg-[#242428] dark:text-[#FBFAFC] text-[#101012]
                             dark:border-none border-[#D4DCF1] flex flex-row gap-4 items-center h-[45px] px-4 rounded-[6px]'>
                                    <MagnifyingGlassIcon className='w-[18px] h-[18px] text-[#0D2159] dark:text-[#BACAF5]' />
                                    <input placeholder='Enter Address' type='text'
                                        value={seacrh}
                                        onChange={(e) => searchHandle(e)}
                                        className='w-full dark:bg-[#242428] bg-[#FBFAFC] focus:border-none outline-none 
                                  text-[13px] font-[400] px-[16px] py-[12px]' />
                                </div>
                            </div>
                        )
                    }


                </div>

                {/**Welcome text /login button */}
                <div>
                    {
                        showDisplayInfo ? (
                            <div className='flex items-center gap-4'>
                                <p className='text-[16px] font-[500] text-[#101012] dark:text-[#FBFAFC] max-sm:hidden'>
                                    Welcome!
                                </p>
                                <Avatar src={profilePicture} circle onClick={logOutFunc} />
                            </div>
                        ) : (
                            <button className='text-[#557FF2] uppercase text-[14px] font-medium' onClick={() => navigate('/login')}>
                                Login
                            </button>
                        )
                    }
                </div>

            </div>

            {/**search information, create a review button  */}
            {
                SearchInfo && (
                    <div className='mt-3'>

                        <div className='flex md:justify-between max-md:flex-col'>
                            {/**Search result */}
                            <h2 className='text-[18px] font-[500] leading-[29.05px]'>
                                {seacrh}
                            </h2>

                            {/**Create a review button */}
                            {
                                reviewnumber > 0 && (
                                    <div className='max-md:my-4 max-md:justify-between flex gap-3'>
                                        <button className='uppercase bg-[#3366FF] text-white rounded-[6px]
                                           px-[25px] py-[10px] font-[500] text-[14px]' onClick={openReviewHandle}>
                                            Leave a Review
                                        </button>
                                        <div className='flex  gap-3'>
                                            <button className='border-[#3366FF] border-[1.5px] rounded-[6px] px-3 py-2'>
                                                <BookmarkIcon className='h-[16px] w-[16px] text-[#3366FF]' />
                                            </button>
                                            <button className='border-[#3366FF] border-[1.5px] rounded-[6px] px-3 py-2'>
                                                <ShareIcon className='h-[16px] w-[16px] text-[#3366FF]' />
                                            </button>
                                        </div>

                                    </div>
                                )
                            }

                        </div>

                        {/**Number of reviews */}
                        <p className='text-[12px] font-[500] max-sm:mt-3'>
                            {reviewnumber} Reviews
                            {
                                reviewnumber > 0 && <span className='px-3'>(People are raving about the selected location)</span>
                            }
                        </p>

                        {/**Amenties */}
                        <Swiper slidesPerView='auto' spaceBetween={15} freeMode centeredSlidesBounds
                            className='mt-3'>
                            {
                                categories.map((category, index) => (
                                    <SwiperSlide key={index} style={{ width: 'fit-content' }}>
                                        <button type='button'
                                            className='bg-[#FBFAFC] dark:bg-[#242428] text-[14px] font-[400] rounded-[5px]
                                             px-[8px] py-[4px] dark:border-[#020202] dark:border-[0.2px]'>
                                            {category.name}
                                        </button>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>

                    </div>
                )
            }


        </div>

    )
}

export default Navbar;