import React from 'react';
import Order from '@/src/components/custom/Order';

const Orders = () => {
  return (
    <>
      <h1 className='text-5xl my-5 mb-10 forprim font-bold'>Orders</h1>
      <h2 className='px-3 text-3xl my-5'>Live Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        <Order />
      </div>
      <h2 className=' px-3 text-3xl my-5'>Past Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        <Order />
        <Order />
      </div>
    </>
  );
};

export default Orders;
