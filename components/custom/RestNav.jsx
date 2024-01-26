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

const RestNav = ({ params }) => {
  console.log(params);
  // const name = decodeURIComponent(params.name);
  // alert(getCookie('Token'));

  // function getCookie(cname) {
  //   var allcookies = document.cookie;
  //   var arrayb = allcookies.split(';');
  //   for (item in arrayb) {
  //     if (item.startsWith('Token=')) {
  //       var c = item.substr(5);
  //       return c;
  //     }
  //   }
  // }
  return (
    <div className='w-[100%] h-20 flex flex-row justify-around align-middle'>
      <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
        <Image src='/img/logo.png' width={160} height={80} />
      </div>
      <div className='flex flex-row justify-evenly items-center text-2xl w-[50%]'>
        <Link href='/restaurant/orders'>
          <span className='hover:scale-105 '>Orders</span>
        </Link>
        <Link href='/restaurant/menu'>
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
          <DropdownMenuContent className='h-[50vh] w-[30vh]'>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem href='/restaurant/menu'>Menu</DropdownMenuItem>
            <DropdownMenuItem href='/restaurant/orders'>
              Orders
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default RestNav;
