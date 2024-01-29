import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='w-full flex flex-col items-center justify-evenly backprim p-10 rounded-t-3xl'>
      <div className='flex flex-row justify-around items-center w-[80%] flex-wrap'>
        <Link href='/'>
          <div className='logo flex flex-row justify-evenly gap-5 items-center overflow-hidden my-5'>
            <Image src='/img/logo.svg' width={80} height={100} />
            <span className='text-white text-3xl font-bold'>FOODLY</span>
          </div>
        </Link>
        <span className='text-white'>© 2024 Foodly</span>
        <div className='icons'>
          <img
            className='invert h-24'
            src='/img/social.png'
            alt='hhhhhhhhhhhhhhhhhhhhhhh'
          />
        </div>
      </div>
      <Link href='/admin/login'>
        <span className='h-16 bg-white text-black'>Admin: made visible</span>
      </Link>
    </div>
  );
};

export default Footer;
