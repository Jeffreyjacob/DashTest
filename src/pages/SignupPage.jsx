import React, { useState } from 'react';
import { motion } from 'framer-motion';
import padlockicon from '../assets/images/Vector (Stroke).png';
import { socialLogin } from '../assets/data/socialdetails';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import EmailVerification from './emailVerification';
import { auth } from '../firebase';
import Error from '../components/errorMessage';
import Navbar from '../components/Navbar';


function SignupPage() {
    const navigate = useNavigate();
    const [openEmailMessage, setOpenEmailMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const schema = z.object({
        email: z.string().min(1, { message: 'Email is required' }).email({
            message: 'Must be a valid email'
        }),
        firstname: z.string().min(1, { message: 'Enter your first name' }),
        lastname: z.string().min(1, { message: 'Enter your last name' }),
        password: z.string()
            .min(8, "a minimum of eight characters")
            .refine((value) => /^(?=.*?[A-Z])/.test(value), "one upper case letter")
            .refine((value) => /[0-9]/.test(value), "at least one number")
            .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), "at least one special character"),
        confirmPassword: z.string().min(1, { message: "Confirm Password is required" })
    }).refine((data) => data.password === data.confirmPassword, {
        message: "password must match",
        path: ["confirmPassword"]
    })

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
    const onsubmit = async (data) => {
        if (data) {
            console.log(data);
            try {
                const userCredential = await auth.createUserWithEmailAndPassword(data.email, data.password);
                await userCredential.user.updateProfile({
                    displayName: data.firstname
                });
                navigate('/searchpage');
            } catch (err) {
                console.log(err);
                setErrorMessage(err.message);
                setShowErrorMessage(true)

            }


        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='flex justify-center items-center py-12 min-h-screen'
        >

            <div className='fixed top-0 left-0 right-0'>
                <Navbar />
            </div>
            {/**signUp card*/}
            <div className=' bg-[#FAFCFD] dark:bg-[#0D0D0D] text-[#1E1E1E] dark:text-[#FBFAFC] 
               font-inter rounded-[8px] w-[345px] py-5 px-[24px] lg:mt-16 shadow-md my-10 '>

                <h2 className='text-[15px] font-[500] text-center pb-5'>Sign Up</h2>

                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className='w-[305px] flex gap-4'>
                        {/**first Name */}
                        <div className='w-1/2'>
                            <input type='text' className='bg-[#F3F7FE] dark:bg-[#232327] border-[#3366FF80] 
                              border-[0.5px] rounded-[4px] h-[40px] w-[100%] p-2  focus:border-[#3366FF80] outline-none'
                                placeholder='First Name' name='firstname' {...register("firstname")} />

                            {/**first name error message */}
                            {errors.firstname && (
                                <div className='text-red-500 text-[12px] mt-4 px-2'>
                                    {errors.firstname.message}
                                </div>
                            )}
                        </div>


                        {/**last name */}
                        <div className='w-1/2'>
                            <input type='text' className='bg-[#F3F7FE] dark:bg-[#232327] border-[#3366FF80] 
                                 border-[0.5px] rounded-[4px] h-[40px] w-[100%] p-2 focus:border-[#3366FF80] outline-none'
                                placeholder='Last Name' name='lastname' {...register("lastname")} />

                            {/**last name error message */}
                            {errors.lastname && (
                                <div className='text-red-500 text-[12px] mt-4 px-2'>
                                    {errors.lastname.message}
                                </div>
                            )}
                        </div>

                    </div>

                    {/** username*/}
                    <input type='text' className='bg-[#F3F7FE] mt-5 dark:bg-[#232327] border-[#3366FF80] 
                     border-[0.5px] rounded-[4px] h-[40px] w-[300px] p-2 focus:border-[#3366FF80] outline-none'
                        placeholder='Username' />

                    {/** email*/}
                    <input type='text' className='bg-[#F3F7FE] mt-5 dark:bg-[#232327] border-[#3366FF80] 
                     border-[0.5px] rounded-[4px] h-[40px] w-[300px] p-2 focus:border-[#3366FF80] outline-none'
                        placeholder='E-mail' name="email" {...register("email")} />
                    {/**email error message */}
                    {errors.email && (
                        <div className='text-red-500 text-[12px] mt-4 px-2'>
                            {errors.email.message}
                        </div>
                    )}


                    {/**password */}
                    <div className='bg-[#F3F7FE] dark:bg-[#232327] mt-5 border-[#3366FF80] 
                        border-[0.5px] rounded-[4px] h-[40px] w-[300px]  p-2 flex justify-between items-center'>
                        <input type='password' className='bg-[#F3F7FE] dark:bg-[#232327]  focus:border-none
                           outline-none' placeholder='Password' name="password" {...register("password")} />
                        <img src={padlockicon} />
                    </div>

                    {/**password error message */}
                    {errors.password && (
                        <div className='text-red-500 text-[12px] mt-4 px-2'>
                            {errors.password.message}
                        </div>
                    )}

                    {/**confirm password */}
                    <div className='bg-[#F3F7FE] dark:bg-[#232327] mt-5 border-[#3366FF80] 
                        border-[0.5px] rounded-[4px] h-[40px] w-[300px]  p-2 flex justify-between items-center'>
                        <input type='password' className='bg-[#F3F7FE] dark:bg-[#232327]  focus:border-none
                           outline-none' placeholder='Confirm Password' name='password' {...register("confirmPassword")} />
                        <img src={padlockicon} />
                    </div>
                    
                    {/**confirm password error message */}
                    {errors.confirmPassword && (
                        <div className='text-red-500 text-[12px] mt-4 px-2'>
                            {errors.confirmPassword.message}
                        </div>
                    )}

                    {/**signup Button */}
                    <button type='submit' className='bg-[#3366FF] w-full uppercase leading-[18px] text-[14px]
                       rounded-[6px] py-[11px] mt-5 text-white' disabled={isSubmitting}>
                        {
                            isSubmitting ? "Loading...." : "Sign Up"
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
                    <p>Already have an account ?
                        <Link to={'/login'} className='text-[#3366FF] mx-2' style={{ textDecoration: "underline" }}>
                            Log in
                        </Link>
                    </p>
                </div>


            </div>
            {
                openEmailMessage && <EmailVerification open={openEmailMessage}
                    handleClose={() => setOpenEmailMessage(false)} />
            }
            {
                showErrorMessage && <Error message={errorMessage} open={showErrorMessage}
                    handleclose={() => setShowErrorMessage(false)} />
            }

        </motion.div>
    )
}

export default SignupPage