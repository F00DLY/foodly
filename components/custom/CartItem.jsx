import { faker } from '@faker-js/faker';
import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
      <div className='flex flex-row items-center gap-5'>
        <div className=' h-[15vh] w-[15vh]'>
          <img
            className='h-full w-full object-cover'
            src={faker.image.urlLoremFlickr({ category: 'food' })}
            alt=''
          />
        </div>
        <div>{item.name}</div>
      </div>
      <div className='item__details__price'>
        <span className='text-lg font-bold'>₹{item.price}</span>
      </div>
      <div class='flex gap-3 items-center'>
        <span class='count'>{item.quantity}</span>
      </div>
    </div>
  );
};

export default CartItem;
