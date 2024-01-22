import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='w-[100%] h-25 flex flex-row justify-around align-middle'>
      <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
        <Image src='/img/logo.png' width={180} height={100} />
      </div>
      <div className='flex flex-row justify-evenly items-center text-2xl w-[50%]'>
        <Link href='/'>
          <span className='hover:scale-105 font-bold'>Home</span>
        </Link>
        <Link href='/'>
          <span className='hover:scale-105 '>Restaurants</span>
        </Link>
        <Link href='/'>
          <span className='hover:scale-105 '>Register</span>
        </Link>
        <Link href='/'>
          <span className='hover:scale-105 '>Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
