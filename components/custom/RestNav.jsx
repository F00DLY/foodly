import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const RestNav = ({ name }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/restaurant/logOut',
        {}, // Pass an empty object as the request body if not needed
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (response.status === 200) {
        // Handle successful login
        console.log(response.data.data);
        Cookies.remove('user');
        Cookies.remove('name');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        toast.success('User logged out successfully');
        window.location.replace('/');
      } else {
        // Handle login error
        // const errorData = await response.json();
        toast.error('User logout failed');
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error(error.message);
    }
  };
  return (
    <div className='w-[100%] h-20 flex flex-row justify-around align-middle'>
      {/* <Link href='/'> */}
      <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
        <Image src='/img/logo.png' width={160} height={80} />
      </div>
      {/* </Link> */}
      <div className='flex flex-row justify-evenly items-center text-2xl w-[50%]'>
        <Link href={'/restaurant/orders/' + name}>
          <span className='hover:scale-105 '>Orders</span>
        </Link>
        <Link href={'/restaurant/menu/' + name}>
          <span className='hover:scale-105 '>Menu</span>
        </Link>
      </div>

      <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
        <DropdownMenu className='w-[20%]'>
          <DropdownMenuTrigger className='w-16 h-16 rounded-full'>
            <Avatar className='w-16 h-16 rounded-full'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[30vh]'>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem href={'/restaurant/menu/' + name}>
              Menu
            </DropdownMenuItem>
            <DropdownMenuItem href={'/restaurant/orders/' + name}>
              Orders
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default RestNav;
