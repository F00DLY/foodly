'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import axios from 'axios';

const Header = () => {
  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');

      const response = await axios.post(
        'http://localhost:8000/api/v1/users/logOut'
      );

      console.log('Logout response:', response);

      if (response.status === 200) {
        // Handle successful logout
        console.log('User logged out successfully');
        alert('User logged out successfully');
      } else {
        // Handle logout error
        console.error('Logout failed:', response.data);
        alert('Logout failed ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error during logout ' + error.message);
    }
  };

  return (
    <div className='w-[100%] h-25 flex flex-row justify-around items-center'>
      <Link href='/'>
        <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
          <Image src='/img/logo.png' width={180} height={100} />
        </div>
      </Link>
      <div className='flex flex-row justify-evenly items-center text-2xl w-[50%]'>
        <Link href='/'>
          <span className='hover:scale-105 font-bold'>Home</span>
        </Link>
        <Link href='/customer/restaurants'>
          <span className='hover:scale-105 '>Restaurants</span>
        </Link>
        <Link href='/customer/orders'>
          <span className='hover:scale-105 '>Orders</span>
        </Link>
        <Link href='/register/customer'>
          <span className='hover:scale-105 '>Register</span>
        </Link>
        <Link href='/login/customer'>
          <span className='hover:scale-105 '>Login</span>
        </Link>
      </div>
      <DropdownMenu className='w-[20%]'>
        <DropdownMenuTrigger className='w-16 h-16 rounded-full'>
          <Avatar className='w-16 h-16 rounded-full'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[30vh]'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href='/customer/restaurants'>
            <DropdownMenuItem>Restaurants</DropdownMenuItem>
          </Link>
          <Link href='/customer/orders'>
            <DropdownMenuItem>Orders</DropdownMenuItem>
          </Link>
          <Link href='/register/customer'>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </Link>
          <Link href='/login/customer'>
            <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;