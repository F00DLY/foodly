import React from 'react';

const Dish = ({ menuItem }) => {
  return (
    <div className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
      <div className='flex flex-row items-center gap-5'>
        {/* <div className=' h-[15vh] w-[15vh]'>
          <img
            className='h-full w-full object-cover'
            src='/img/pizza.jpg'
            alt=''
          />
        </div> */}
        <div>{menuItem.name}</div>
      </div>
      <div className='item__details__price'>
        <span className='text-lg font-bold'>₹{menuItem.price}</span>
      </div>
      <div class='flex gap-3 items-center'>
        <button class=' h-8 w-8 border-2 border-black text-lg'>+</button>
        <span class='count'>4</span>
        <button class=' h-8 w-8 border-2 border-black text-lg'>-</button>
      </div>
    </div>
  );
};

export default Dish;
