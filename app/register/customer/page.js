import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Customer = () => {
  return (
    <Card className='w-[80%] md:w-[60%] lg:w-[40%] logIn'>
      <CardHeader className='flex-row items-center justify-between '>
        <CardTitle>Register As Customer</CardTitle>
        <Link href='/register/restaurant'>
          <Button variant='outline'>As a Restaurant</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-5'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Name' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' placeholder='Email' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='mobile'>Phone Number</Label>
              <Input id='mobile' placeholder='Phone Number' />
            </div>

            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' placeholder='Atleast 6 characters.......' />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link href='/login/customer'>
          <Button variant='secondary'>Already have an account?</Button>
        </Link>
        <Button>Register</Button>
      </CardFooter>
    </Card>
  );
};

export default Customer;
