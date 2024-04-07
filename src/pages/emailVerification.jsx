import React,{useState} from 'react';
import { motion } from 'framer-motion';
import EnvelopeIcon from '../assets/images/freepik  Envelope  inject 4 1.png';
import { Modal, Placeholder } from 'rsuite';

function EmailVerification({handleClose,open}) {
    return (
       <Modal open={open} onClose={handleClose} 
       className='bg-[#FAFCFD] dark:bg-[#0D0D0D] text-[#1E1E1E] dark:text-[#FBFAFC] 
                  font-inter rounded-[8px] w-[400px] py-5 px-[24px]  shadow-md flex flex-col  justify-center
                   items-center' >
        <Modal.Body className=' bg-[#FAFCFD] dark:bg-[#0D0D0D] text-[#1E1E1E] dark:text-[#FBFAFC] 
        p-5'>
        <img src={EnvelopeIcon} className='w-[88px] h-[88px] mt-3 ' />
                    <p className='text-[#3366FF] text-[13px] mt-4 font-[500] text-center'>Verify E-mail Address</p>
                    <p className='text-[13px] font-[400] text-center mt-5'>
                        Thank you for signing up on AreaFinder. In order to
                        keep your account safe and secure, we’ll need you to
                        verify your e-mail address by clicking the verification
                        link sent to your mail box. Thank you!
                    </p>
                    <button type='submit' className='bg-[#3366FF] w-full uppercase leading-[18px] text-[14px]
                       rounded-[6px] py-[11px] mt-5 text-white' onClick={()=>handleClose()}>
                        Go to your mailbox
                    </button>
        </Modal.Body>      
       </Modal>
    )
}

export default EmailVerification;