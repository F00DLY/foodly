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

const Restaurant = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/restaurant/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log('data');
        console.log(data.data.restaurant);
        toast.success('User logged in successfully');

        window.location.replace(
          '/restaurant/orders/' + data.data.restaurant.Restaurantname
        );
      } else {
        // Handle login error
        const errorData = await response.json();
        toast.error('User login failed' + errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.message);
    }
  };

  return (
    <Card className='w-[80%] md:w-[60%] lg:w-[40%] logIn rounded-3xl backprim text-white'>
      <CardHeader className='flex-row items-center text-white justify-between backsec rounded-t-3xl mb-10'>
        <CardTitle>Login As Restaurant</CardTitle>
        <Link href='/login/customer'>
          <Button variant='outline' className='backprim rounded-2xl h-12'>
            As a Customer
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-10'>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <input
                className='rounded-full forprim h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email.......'
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <input
                className='rounded-full forprim h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password.....'
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex text-white md:justify-between justify-center flex-wrap-reverse'>
        <Link href='/register/customer'>
          <Button className='text-white text-xl font-bold' variant='secondary'>
            Don't have an account?
          </Button>
        </Link>
        <button
          onClick={handleLogin}
          class='inline-flex items-center justify-center rounded-md h-10 px-4 py-2 backsec text-white font-bold'
        >
          Login
        </button>
      </CardFooter>
    </Card>
  );
};

export default Restaurant;