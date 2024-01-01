'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email:"",
    password:"",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // This bearer would be generated via backend api for authenticated user and sent with each request
  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzYzYmFhZGI2YzM0OTZkZGY3YzYzNyIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcwNDEzNDcyOCwiZXhwIjoxNzA0MTM4MzI4fQ.VRnpRT9LxfebCLnaBKSPe21VBIDTUj5xWud3VMsGEVw';
  
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', 
      user,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

      console.log('Login success', response.data);
      toast.success('Login success');
      router.push('/profile')
    } catch (error: any) {
      console.log('Login failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  const updateUser = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value} );
  }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>{loading ? 'Processing' : 'Login'}</h1>
          <hr />
          <label htmlFor='email'>email</label>
          <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            id='email'
            name='email'
            type='text'
            value={user.email}
            onChange={updateUser}
            placeholder='email'
          />
          <label htmlFor='password'>password</label>
          <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            id='password'
            name='password'
            type='text'
            value={user.password}
            onChange={updateUser}
            placeholder='password'
          />
          <button
            type='button'
            onClick={onLogin}
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            disabled={buttonDisabled}
          >
            {buttonDisabled ? 'Disabled' : 'Login'}
          </button>
          <Link href='/signup'>Visit Signup page</Link>
      </div>
    )
  }