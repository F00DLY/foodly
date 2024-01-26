import React from 'react';
import RestOrder from '@/components/custom/RestOrder';
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

const Orders = ({ params }) => {
  const name = decodeURIComponent(params.name);
  return (
    <>
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
            <DropdownMenuContent className='h-[50vh] w-[30vh]'>
              <DropdownMenuLabel></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem href={'/restaurant/menu/' + name}>
                Menu
              </DropdownMenuItem>
              <DropdownMenuItem href={'/restaurant/orders/' + name}>
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <h1 className='text-5xl my-5 mb-10 forprim font-bold'>{name}</h1>
      <h2 className='px-3 text-3xl my-5'>Live Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        <RestOrder />
      </div>
      <h2 className=' px-3 text-3xl my-5'>Past Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        <RestOrder />
        <RestOrder />
        <RestOrder />
        <RestOrder />
      </div>
    </>
  );
};

export default Orders;
