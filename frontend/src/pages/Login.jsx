import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  // Manages the current form view, toggling between 'Login' and 'Sign UP' modes
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Handles form submission, preventing the default page reload
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendURL + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
        }
        else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendURL + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else {
          toast.error(response.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token)
    {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl font-serif'>{currentState}</p>
      </div>
      {/* Conditionally renders the 'Name' input field only when the user is in 'Sign UP' mode */}
      {
        currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 border border-gray-800 font-serif' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 border border-gray-800 font-serif' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 border border-gray-800 font-serif' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer font-serif'>Forgot Password</p>
        {/* Toggles the state between 'Login' and 'Sign UP' depending on the current view */}
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer font-serif'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer font-serif'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-serif px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login