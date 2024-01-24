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
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
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
        <Link href='/'>
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
        <DropdownMenuContent className='h-[50vh] w-[30vh]'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;