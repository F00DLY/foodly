import React from 'react';
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

const Restaurant = () => {
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
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='Name'
                placeholder='Your Restaurant Name'
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <Input
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='email'
                placeholder='Email'
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <Input
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='number'
                placeholder='Mobile Number'
              />
            </div>
            <div className='flex flex-col space-y-1.5 w-[80%] mx-auto'>
              <Input
                className='rounded-full h-14 bg-[ rgb(250, 248, 244)] font-bold text-2xl pl-5'
                id='password'
                placeholder='Password'
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
        <Button className=' backsec text-white font-bold'>Register</Button>
      </CardFooter>
    </Card>
  );
};

export default Restaurant;
