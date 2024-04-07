import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { review } from '../assets/data/Reviews';
import EmptyImage from '../assets/images/Empty State.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';
import userImage from '../assets/images/Ellipse 1.png';
import { Avatar } from 'rsuite';
import { HandThumbUpIcon,HandThumbDownIcon,ChatBubbleLeftIcon} from "@heroicons/react/24/outline";
import {StarIcon} from '@heroicons/react/24/solid';
import { reviewImages } from '../assets/data/images';
import CreateReview from '../components/CreateReview';
import { db } from '../firebase';
import { motion } from 'framer-motion';


function SearchPage({isDarkMode}) {
  const [AllReview, setAllReview] = useState([]);
  const [openReview, setOpenReview] = useState(false);

  useEffect(()=>{
    const fetchReview = async ()=>{
      db.collection('reviews').orderBy('timePosted', 'desc').onSnapshot(
        snapshot => {
            const items = snapshot.docs.map(docs => ({
                id: docs.id,
                data: docs.data()
            }))
            console.log(items)
            setAllReview(items)
           
        }
    )
    }
    fetchReview();

  },[])

  const OpenReviewHandle = ()=>{
    setOpenReview(true)
    console.log(openReview)
  }
  return (
    <div className='min-h-screen'>

      <Navbar Searchbar={true} SearchInfo={true} reviewnumber={AllReview.length} setOpenReview={setOpenReview}/>


      <div className='flex flex-col justify-center items-center
         text-[#1E1E1E] dark:text-[#FBFAFC] font-inter lg:px-16 py-5 max-lg:px-6'>
        {/**when there is no review */}
        {
          AllReview.length <= 0 && (
            <div className='mt-10 flex flex-col justify-center items-center mb-10'>
              <img src={EmptyImage} width={255} />
              <p className='text-[16px] font-[400] mt-7 text-center'>Oop! No review yet.</p>
              <button type='button' onClick={OpenReviewHandle}
                className='bg-[#3366FF] dark:bg-[#171717] text-[#FFFFFF] dark:text-[#3366FF] text-[16px]
                 font-[500] rounded-[6px] dark:border-[0.5px] dark:border-[#3366FF] px-[25px] py-[10px] mt-10'>
                Leave a review
              </button>
            </div>
          )
        }
          
            {/**Create new a rewview */}
            {
            openReview &&  <CreateReview open={openReview} isDarkmode={isDarkMode}  handleclose={()=>setOpenReview(false)}/>
          }

        {/**When there is a review */}
        {
          AllReview.length > 0 && (
            <div className='flex flex-col-reverse lg:flex-row justify-center'>
              {/**left column */}
              <div className='lg:w-[722px] max-lg:mt-4'>
                <Swiper
                  direction='vertical'
                  slidesPerView='auto'
                  freeMode
                  scrollbar
                  mousewheel
                  className='sm:h-[600px] h-[500px]'
                >
                  {
                    AllReview.map((review, index) => (
                      <SwiperSlide key={index} style={{ height: 'fit-content' }} className='py-5 px-3 pb-5'>
                        <div className='border-b-[1px] border-[#D9D9D9] pb-7'>
                          <div className='flex justify-between items-center text-[14px] font-[400]'>
                            <div className='flex justify-between items-center gap-3'>
                              <Avatar src={userImage} width={20} height={20} circle style={{ objectFit: "contain" }} />
                              <span>{review?.data?.username}</span>
                              <span className='text-[#1e1e1e99] dark:text-[#fbfafc99]'>{ new Date(review?.data?.timePosted?.seconds * 1000).toUTCString()}</span>
                            </div>

                            {/**review rating */}
                            <div className='flex justify-center gap-2'>
                              <StarIcon className='h-[16px] w-[16px] text-[#FABB07]'/>
                              <span>
                                {review?.data?.reviewRating}
                              </span>
                            </div>

                          </div>
                          <p className='text-[16px] font-[400] mt-4'>{review?.data?.reviewDescription}</p>

                          {/**review impression and commit */}
                          <div className='flex justify-start items-center text-[16px] font-[400] mt-4 text-[#0D2159]
                           dark:text-[#BACAF5] gap-3'>

                            {/**likes */}
                            <div className='flex gap-1 items-center'>
                              <HandThumbUpIcon className='h-[16px] w-[18px] dark:text-[#BACAF5] text-[#0D2159]' />
                            <span>
                              {review?.data?.like}
                            </span>
                            </div>

                            {/**dislike */}
                            <div className='flex gap-1 items-center'>
                              <HandThumbDownIcon className='h-[16px] w-[18px] dark:text-[#BACAF5] text-[#0D2159]' />
                            <span>
                              {review?.data?.dislikes}
                            </span>
                            </div>

                            {/**comment */}
                            <div className='flex gap-1 items-center'>
                              <ChatBubbleLeftIcon className='h-[16px] w-[18px] dark:text-[#BACAF5] text-[#0D2159]' />
                            <span>
                              {review?.data?.comments}
                            </span>
                            </div>


                          </div>

                        </div>
                      </SwiperSlide>

                    ))
                  }
                </Swiper>

              </div>

              {/**right Column*/}
              <div className='flex lg:w-[420px]  lg:px-3'>
                 {/**right Column for large screen*/}
              <div className='max-lg:hidden flex flex-wrap justify-center h-[400px]'>
              {
                reviewImages.map((image,index)=>(
                  <img src={image.image} key={index}
                  className='px-2 lg:w-[180px] lg:h-[180px] rounded-[6px] '/>
                ))
               }
                </div>

                {/**right column for small screen */}
                <div className='lg:hidden'>
                <Swiper className='my-5' 
                slidesPerView='auto' spaceBetween={15} freeMode centeredSlidesBounds >
                  {
                    reviewImages.map((image,index)=>(
                      <SwiperSlide style={{width:'fit-content'}}>
                        <img src={image.image} key={index}/>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
                </div>
              
              </div>

            </div>
          )
        }

      </div>
        
  
    </div>
  )
}

export default SearchPage