import React from 'react';

const Dish = () => {
  return (
    <div className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
      <div className='flex flex-row items-center gap-5'>
        <div className=' h-[15vh] w-[15vh]'>
          <img
            className='h-full w-full object-cover'
            src='/img/pizza.jpg'
            alt=''
          />
        </div>
        <div className='item__details__title'>Dish Name</div>
      </div>
      <div className='item__details__price'>Price</div>
      <div class='flex gap-3 items-center'>
        <button class=' h-8 w-8 border-2 border-black text-lg'>+</button>
        <span class='count'>4</span>
        <button class=' h-8 w-8 border-2 border-black text-lg'>-</button>
      </div>
    </div>
  );
};

export default Dish;
