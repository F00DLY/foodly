'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Customer = () => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobail, setmobail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name,
            email,
            mobail,
            password,
          }),
        }
      );

      if (response.ok) {
        // Handle successful registration
        const data = await response.json();
        toast.success('User registered successfully');
        window.location.replace('/');
      } else {
        // Handle registration error
        const errorData = await response.json();
        toast.error('User registration failed' + errorData.message);
      }
    } catch (error) {
      // Handle registration error
      toast.error('User registration failed');
    }
  };

  return (
    <Card className='w-[80%] md:w-[60%] lg:w-[40%] logIn rounded-3xl backprim text-white'>
      <CardHeader className='flex-row items-center text-white justify-between backsec rounded-t-3xl mb-10'>
        <CardTitle>Register As Customer</CardTitle>
        <Link href='/register/restaurant'>
          <Button variant='outline' className='backprim rounded-2xl h-12'>
            As a Restaurant
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-5'>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <input
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl forprim pl-5'
                id='Name'
                type='text'
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your Name'
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <input
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl forprim pl-5'
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <input
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl forprim pl-5'
                id='mobail'
                type='text'
                value={mobail}
                onChange={(e) => setmobail(e.target.value)}
                placeholder='Mobile mobail'
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <input
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold forprim text-2xl pl-5'
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex text-white md:justify-between justify-center flex-wrap-reverse'>
        <Link href='/login/customer'>
          <Button className='text-white text-xl font-bold' variant='secondary'>
            Already have an account?
          </Button>
        </Link>
        <button
          onClick={handleRegister}
          class='inline-flex items-center justify-center rounded-md h-10 px-4 py-2 backsec text-white font-bold'
        >
          Register
        </button>
      </CardFooter>
    </Card>
  );
};

export default Customer;
