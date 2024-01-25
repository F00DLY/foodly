import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className='w-[100%] h-20 flex flex-row justify-around align-middle'>
      <Link href='/'>
      <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
        <Image src='/img/logo.png' width={160} height={80} />
      </div>
      </Link>
      <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
        <Image src='/img/check.svg' width={180} height={100} />
      </div>
    </div>
  );
};

export default Navbar;
