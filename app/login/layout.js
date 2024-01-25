import Footer from '@/components/custom/Footer';
import Navbar from '@/components/custom/Navbar';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div
        className='w-full items-center justify-between flex flex-row flex-wrap'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <div className='text-wrap md:w-[40%] w-[0%] forprim lg:text-6xl md:text-4xl sm:text-6xl text-4xl  font-semibold'>
          ORDER F<span className='forsec'>OO</span>D IN YOUR CAMPUS NOW!
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
