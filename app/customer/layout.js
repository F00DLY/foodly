import Footer from '@/components/custom/Footer';
import Header from '@/components/custom/Header';
import RestList from '@/components/custom/RestList';
import Slogan from '@/components/custom/Slogan';
import React from 'react';

const Layout = ({ children }) => {
  
  return (
    <>
      <Header />
      <div className='mx-auto md:max-w-3xl w-[90%] mb-24'>{children}</div>
      <RestList />
      <Slogan />
      <Footer />
    </>
  );
};

export default Layout;
