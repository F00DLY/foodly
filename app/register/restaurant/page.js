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
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const Restaurant = () => {
  const [Restaurantname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobail, setmobail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/restaurant/register',
        {
          Restaurantname,
          email,
          mobail,
          password,
        }
      );
      // fetch(
      //   'http://localhost:8000/api/v1/restaurant/register',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       Restaurantname,
      //       email,
      //       mobail,
      //       password,
      //     }),
      //   }
      // );

      if (response.status === 201) {
        // Handle successful registration
        toast.success('User registered successfully');
        window.location.replace('/login/restaurant');
        // console.log('User registered successfully:', data);
      } else {
        // Handle registration error
        const errorData = await response.json();
        toast.error('User registration failed');
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      // Handle registration error
      toast.error('User registration failed');

      console.error('Error during registration:', error);
    }
  };

  return (
    <Card className='w-[80%] md:w-[60%] lg:w-[40%] logIn rounded-3xl backprim text-white'>
      <CardHeader className='flex-row items-center text-white justify-between backsec rounded-t-3xl mb-10'>
        <CardTitle>Register As Restaurant</CardTitle>
        <Link href='/register/customer'>
          <Button variant='outline' className='backprim rounded-2xl h-12'>
            As a Customer
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-5'>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <Input
                className='rounded-full h-14 forprim bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='Name'
                placeholder='Your Restaurant Name'
                value={Restaurantname}
                type='text'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <Input
                className='rounded-full h-14 forprim bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='email'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <Input
                className='rounded-full h-14 forprim bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='number'
                placeholder='Mobile Number'
                type='text'
                value={mobail}
                onChange={(e) => setmobail(e.target.value)}
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <Input
                className='rounded-full h-14 forprim bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='password'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex text-white md:justify-between justify-center flex-wrap-reverse'>
        <Link href='/login/restaurant'>
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

export default Restaurant;
