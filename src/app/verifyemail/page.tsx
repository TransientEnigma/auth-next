"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState} from 'react';

export default function VerifyEmailPage() {
    // the data
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // verify method
    const verifyUserEmail = async () => {
        
        console.log('verifyUserEmail frontend token: ', token);

        try {
            // token will come from the state
            await axios.post('/api/users/verifyemail', {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            // axios will return a response and may throw an error
            console.log(error.response.data);
        }
    }

    // next.js will do optimisation and deduping automatically

    // When we have [] this is equivalent to the componentDidMount lifecycle method in class components.
    useEffect(() => {
        // grap the token from URL when someone lands on the page
        // split on '=' to an array or 2 elements index 0, and 1 (token)
        const urlToken = window.location.href.split('=')[1];
        setToken(urlToken || '');
    }, []);

    // when there is a change in the token run this 
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <p className='p-2 bg-orange-500 text-black'>{token ? `${token}` : 'no token'}</p>

            {verified && (
                <div>
                    <h2 className='text-2xl'>Email Verified</h2>
                    <Link href='/login'>
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className='text-2xl bg-red-500'>Error</h2>
                </div>
            )}
        </div>
    )
}
