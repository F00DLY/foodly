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
import axios from 'axios';
import Cookies from 'js-cookie';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/admin/login',
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        // Handle successful login
        console.log(response);
        Cookies.set('name', response.data.data.Admin._id);
        Cookies.set('accessToken', response.data.data.accessToken);

        toast.success('User logged in successfully');
        window.location.replace('/admin/' + response.data.data.Admin._id);
      } else {
        // Handle login error
        const errorData = await response.json();
        toast.error('User login failed' + errorData.message);
      }
    } catch (error) {
      // Handle login error
      toast.error('User login failed');
    }
  };

  return (
    <Card className='w-[80%] md:w-[60%] lg:w-[40%] logIn rounded-3xl backprim text-white'>
      <CardHeader className='flex-row items-center text-white justify-between backsec rounded-t-3xl mb-10'>
        <CardTitle>Login As Admin</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-10'>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <input
                className='rounded-full h-14 forprim bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
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

export default Admin;
