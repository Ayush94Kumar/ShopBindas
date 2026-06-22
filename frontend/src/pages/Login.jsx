import React, { useState } from 'react'

const Login = () => {
  // Manages the current form view, toggling between 'Login' and 'Sign UP' modes
  const [currentState, setCurrentState] = useState('Login');
// Handles form submission, preventing the default page reload
  const onSubmitHandler =async (event)=>{
      event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p  className='prata-regular text-3xl font-serif'>{currentState}</p>
      </div>
      {/* Conditionally renders the 'Name' input field only when the user is in 'Sign UP' mode */}
        {currentState==='Login'? '':<input type="text" className='w-full px-3 border border-gray-800 font-serif' placeholder='Name' required/>} 
      <input type="email" className='w-full px-3 border border-gray-800 font-serif' placeholder='Email' required/>
      <input type="password" className='w-full px-3 border border-gray-800 font-serif' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer font-serif'>Forgot Password</p>
        {/* Toggles the state between 'Login' and 'Sign UP' depending on the current view */}
        {
          currentState ==='Login'
          ? <p onClick={()=>setCurrentState('Sign UP')} className='cursor-pointer font-serif'>Create Account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer font-serif'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-serif px-8 py-2 mt-4 cursor-pointer'>{currentState==='Login' ? 'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login