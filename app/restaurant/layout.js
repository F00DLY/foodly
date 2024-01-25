import Footer from '@/components/custom/Footer';
import RestNav from '@/components/custom/RestNav';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <div className='mx-auto md:max-w-3xl w-[90%] mb-24'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
