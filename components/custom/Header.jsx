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
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Header = () => {
  // parse cookies string to object
  const cookies = Cookies.get('user');
  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');

      const response = await axios.post(
        'http://localhost:8000/api/v1/users/logOut',
        {}, // Pass an empty object as the request body if not needed
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );

      Cookies.remove('user');
      Cookies.remove('name');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      console.log('Logout response:', response);

      if (response.status === 200) {
        console.log('User logged out successfully');
        toast.success('User logged out successfully');
        // alert('User logged out successfully');
        window.location.replace('/');
      } else {
        console.error('Logout failed:', response.data);
        // alert('Logout failed ' + response.data.message);
        toast.error('Logout failed ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // alert('Error during logout ' + error.message);
      toast.error('Error during logout ' + error.message);
    }
  };

  return (
    <div className='w-[100%] h-25 flex flex-row justify-around items-center'>
      <Link href='/'>
        <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
          <Image src='/img/logo.png' width={180} height={100} />
        </div>
      </Link>
      <div className='md:flex hidden flex-row justify-evenly items-center text-2xl  w-[50%]'>
        <Link href='/'>
          <span className='hover:scale-105 font-bold'>Home</span>
        </Link>
        <Link href='/customer/restaurants'>
          <span className='hover:scale-105 '>Restaurants</span>
        </Link>
        {cookies === undefined ? (
          <>
            <Link href='/register/customer'>
              <span className='hover:scale-105 '>Register</span>
            </Link>
            <Link href='/login/customer'>
              <span className='hover:scale-105 '>Login</span>
            </Link>
          </>
        ) : (
          <>
            <Link href='/customer/orders'>
              <span className='hover:scale-105 '>Orders</span>
            </Link>
            <Link href='/customer/cart'>
              <span className='hover:scale-105 '>Cart</span>
            </Link>
          </>
        )}
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
          {cookies === undefined ? (
            <>
              <Link href='/register/customer'>
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>
              <Link href='/login/customer'>
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link href='/customer/profile'>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href='/customer/orders'>
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <button onClick={handleLogout}>Logout</button>
              </DropdownMenuItem>
            </>
          )}

          {/* */}
          {/* <Link href='/'> */}

          {/* </Link> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
