import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import AnimatedRoutes from './AnimatedRoutes';

function App() {
   const [isDarkmode,setDarkMode] = useState(false);
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', prefersDarkMode);
    setDarkMode(prefersDarkMode);
  },[prefersDarkMode])
  return (
    <div className='bg-white dark:bg-[#171717]'>
       <AnimatedRoutes isDarkmode={isDarkmode}/>
    </div>
  );
}

export default App;
