import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerification from './pages/emailVerification';
import SearchPage from './pages/SearchPage';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';


function AnimatedRoutes({ isDarkmode }) {
  const location = useLocation()
  const [User, setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const OnAuthChange = () => {
      auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          setUser(userAuth.displayName);
          setUser(true);
          navigate('/searchpage')
        } else {
          setUser(false); 
        }
      })
    }
    OnAuthChange();
  }, [auth])
  return (
    <AnimatePresence className='relative'>
      <Routes location={location} key={location.pathname}>
        {
          !User ? (
            <>
              <Route path='/' element={<HomePage isDarkMode={isDarkmode} />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </>
          ) : (
            <>
              <Route path='/searchpage' element={<SearchPage isDarkMode={isDarkmode} />} />
            </>
          )
        }


      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes