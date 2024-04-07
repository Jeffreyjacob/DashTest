import React, { useState } from 'react';
import { Modal, Rate, Checkbox } from 'rsuite';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { categories } from '../assets/data/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';


function CreateReview({ open, handleclose, isDarkmode }) {

  const schema = z.object({
    reviewDesc:z.string().min(1),
  });
  
  const [rating, setRating] = useState('');
  const [showAmenties, setShowAmenties] = useState(false);
  const [amenties,setAmenties] = useState([]);
  const amentiesHandle = ()=>{
    setShowAmenties(!showAmenties);
  }

  const { register, handleSubmit, formState: { errors, isValid,isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
     await db.collection('reviews').add(
      {
      username:"jeffrey Jacob",
       reviewDescription:data.reviewDesc,
       reviewRating:rating,
       like:"1224",
       dislikes:"4",
       comments:"24",
       amenties:amenties,
       timePosted:firebase.firestore.FieldValue.serverTimestamp()
    }
     )
    console.log(data);
    handleclose();

  }

const selectAmentiesHandle = (selectedAmenties)=>{
  if(!amenties.some((item)=> item.name === selectedAmenties)){
      setAmenties([...amenties,selectedAmenties])
  }
  if(amenties.some((item)=> item.name === selectedAmenties)){
    const updatedAmenties = amenties.filter((item)=>item.name !== selectedAmenties)
    setAmenties(updatedAmenties);
  }
}

  return (
    <Modal keyboard={false} open={open} onClose={handleclose} color='#171717'
      className='font-inter text-[#1E1E1E]  dark:border-[#D4DCF1] dark:border-[1px]
    dark:rounded-[6px] dark:bg-[#171717]'>
      <Modal.Header >
        <Modal.Title className='text-center text-[15px] font-[500]'>Review Location</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>

      <Modal.Body >
        <div>
          <p className='text-[15px] font-[500]'>Bonny and Clyde Street, Ajao Estate, Lagos</p>
            
          {/**Select Amenties */}
          <div className='mt-4 relative'>
            <div className='bg-[#F3F7FE] rounded-[6px] p-3 flex justify-between'
              onClick={amentiesHandle}>
              <span>Select Amenties</span>
              <ChevronDownIcon className='h-[16px] w-[16px] text-[#8F95B2]' />
            </div>

            {
              showAmenties && (
                <div className='absolute bg-[#F3F7FE] rounded-[6px] px-2 py-3 border-[#D4DCF1]
                border-[1px]' style={{zIndex:'10'}}>
                    <div className='flex flex-wrap'>
                     {
                      categories.map((amenties,index)=>(
                        <Checkbox key={index} onChange={()=>selectAmentiesHandle(amenties.name)}>
                          {amenties.name}
                        </Checkbox>
                      ))
                     }
                    </div>
                </div>
              )
            }

          </div>
           {amenties}
          {/**Star rating */}
          <div className='mt-5'>
            <p className='text-[14px] font-[500] leading-[16.94px]'>Rate Location</p>
            <Rate allowHalf size='50' color='yellow' onChangeActive={setRating}
          />
          </div>

          {/**Write a review */}
          <div className='mt-6'>
            <p className='text-[14px] font-[400] mb-3'>Write Review</p>
            <textarea className='border-[#D4DCF1] rounded-[6px] border-[1px] focus:border-[#D4DCF1]
           outline-[#D4DCF1] p-3' placeholder='Placeholder'
              style={{ height: '120px', width: '100%' }} 
              {...register('reviewDesc')}/>
          </div>

          {/**Checkbox */}
          <Checkbox>Post as Anonymous</Checkbox>

        
            <div className='w-full font-[500] text-[14px] uppercase gap-3 mt-2'>
              {
                isValid ? (
                <button className='bg-[#3366FF] w-1/2 rounded-[6px] py-2 text-[white]'
                type='submit'>
                 {
                  isSubmitting? 'Loading...':'submit'
                 }
               </button>):(
                  <button className='bg-[#E4E9FB] w-1/2 rounded-[6px] py-2 text-[white]'>
                   Submit
                 </button>
               )
              }
              <button className='border-[#3366FF] w-1/2 border-[1px] rounded-[6px] py-2 text-[#3366FF]'
              onClick={handleclose}>
                Cancel
              </button>
            </div>
   


        </div>
      </Modal.Body>

      </form>

      

    </Modal>
  )
}

export default CreateReview