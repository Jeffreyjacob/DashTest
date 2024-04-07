import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon,EyeSlashIcon } from '@heroicons/react/16/solid';
import { socialLogin } from '../assets/data/socialdetails';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Error from '../components/errorMessage';
import Navbar from '../components/Navbar';



function LoginPage() {
  const navigate = useNavigate()
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [passwordVisiblity, setpasswordVisiblity] = useState(false)
  const schema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email'
    }),
    password: z.string()
      .min(8, "a minimum of eight characters")
      .refine((value) => /^(?=.*?[A-Z])/.test(value), "one upper case letter")
      .refine((value) => /[0-9]/.test(value), "at least one number")
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), "at least one special character")
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const onsubmit = async (data) => {

    if (data) {
      try {
         await auth.signInWithEmailAndPassword(data.email, data.password);
      } catch (err) {
        setErrorMessage(err.message);
        console.log(err.message);
        setShowErrorMessage(true);
      }

    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className=' min-h-screen'>
        
        <div className='fixed top-0 left-0 right-0'>
        <Navbar/>
        </div>

      {/**Login card */}
      <div className='flex justify-center items-center py-12 max-sm:mt-5 '>
        <div className=' bg-[#FAFCFD] dark:bg-[#0D0D0D] text-[#1E1E1E] dark:text-[#FBFAFC] 
        font-inter rounded-[8px] w-[348px] py-5 px-[24px] lg:mt-16 shadow-md'>
          <h2 className='text-[15px] font-[500] text-center pb-5'>Login</h2>

          <form onSubmit={handleSubmit(onsubmit)}>

            {/**email */}
            <input type='text' className='bg-[#F3F7FE] dark:bg-[#232327] border-[#3366FF80] 
            border-[0.5px] rounded-[4px] h-[40px] w-[300px] p-2 focus:border-[#3366FF80] outline-none'
              placeholder='E-mail' name='email' {...register("email")} />
            {/**Email Error message */}
            {errors.email && (
              <div className='text-red-500 text-[12px] mt-4'>
                {errors.email.message}
              </div>
            )}

            {/**password */}
            <div className='bg-[#F3F7FE] dark:bg-[#232327] mt-5 border-[#3366FF80] 
            border-[0.5px] rounded-[4px] h-[40px] w-[300px] p-2 flex justify-between items-center'>
              <input type={passwordVisiblity ? 'text' : 'password'} className='bg-[#F3F7FE] dark:bg-[#232327]  focus:border-none
             outline-none' placeholder='Password' name='password' {...register("password")} />
              {
                passwordVisiblity ? (
                  <EyeSlashIcon className='dark:text-[#FBFAFC] text-[#8F95B2] h-[16px] w-[16px]'
                  onClick={() => setpasswordVisiblity(false)}/>
                ):( 
                  <EyeIcon className='dark:text-[#FBFAFC] text-[#8F95B2] h-[16px] w-[16px]' 
                  onClick={() => setpasswordVisiblity(true)}/>
                )
              }
                
              
            </div>
            {/**password error message */}
            {errors.password && (
              <div className='text-red-500 text-[12px] mt-4'>
                {errors.password.message}
              </div>
            )}


            {/**login button */}

            <button type='submit' className='bg-[#3366FF] w-full uppercase leading-[18px] text-[14px]
           rounded-[6px] py-[11px] mt-5 text-white'>
              {
                isSubmitting ? '...Loading':'Login'
              }
            </button>

          </form>

          {/**separator */}

          <div className="text-center my-4">
            <div className="flex items-center">
              <hr className="flex-grow mx-2" style={{ color: "#3366FF59" }} />
              <p className="m-0" style={{ color: "#8D8D8D", fontSize: "12px", fontWeight: "400" }}>
                Or</p>
              <hr className="flex-grow mx-2" style={{ color: "#3366FF59" }} />
            </div>
          </div>

          {/**Social login */}
          <div>
            {
              socialLogin.map((item, index) => (
                <button key={index} type='button'
                  className='flex flex-row justify-center items-center border-[#D8DAE5] shadow-md
                bg-[#FFFFFF] dark:bg-[#0D0D0D] py-[8px] w-full my-2 border-[1px] rounded-[8px]'>
                  <img src={item.icon} />
                  <span className='ml-5 text-[11px] font-[400]'>{item.name}</span>
                </button>
              ))
            }
          </div>

          <div className='text-[10px] text-center mt-5'>
            <p className='pb-2' style={{ textDecoration: "underline" }}>Forget Password</p>
            <p>Don't have an account ?
              <Link to={'/signup'} className='text-[#3366FF] mx-2' style={{ textDecoration: "underline" }}>
                Sign Up
              </Link>
            </p>
          </div>



        </div>

        {
          showErrorMessage && <Error open={showErrorMessage} message={errorMessage} handleclose={() => setShowErrorMessage(false)} />
        }

      </div>

    </motion.div>
  )
}

export default LoginPage