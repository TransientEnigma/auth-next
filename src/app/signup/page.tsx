'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email:"",
    password:"",
    username:"",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
          <h1>{loading ? 'Processing' : 'Signup'}</h1>
          <hr />
          <label htmlFor='username'>username</label>
          <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            id='username'
            name='username'
            type='text'
            value={user.username}
            onChange={updateUser}
            placeholder='username'
          />
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
            onClick={onSignup}
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            disabled={buttonDisabled}
          >
            {buttonDisabled ? 'Disabled' : 'Signup here'}
          </button>
          <Link href='/login'>Visit login page</Link>
      </div>
    )
  }