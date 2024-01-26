'use client';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Dish = ({ menuItem }) => {
  const user = Cookies.get('user');
  const [count, setCount] = useState(0); // Initialize count state with 0

  // Function to increment count
  const addCount = () => {
    setCount(count + 1); // Update count state
  };

  // Function to decrement count
  const subCount = () => {
    if (count > 0) {
      setCount(count - 1); // Update count state
    }
  };
  const addCart = async () => {
    if (count === 0) {
      toast.error('Please select quantity');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/cart/add-cart',
        {
          menuItemId: menuItem._id,
          quantity: count,
        },
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (response.status === 201) {
        console.log(response.data.data);
        toast.success('Item added to cart');
        setCount(0);
      } else {
        console.error('Add to cart failed: 1', response.data);
        toast.error('Add to cart failed ' + response.data.message);
      }
    } catch (error) {
      console.error('Add to cart failed:', error);
      toast.error('Add to cart failed ' + error.message);
    }
  };
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
        <div>{menuItem.name}</div>
      </div>
      <div className='item__details__price'>
        <span className='text-lg font-bold'>₹{menuItem.price}</span>
      </div>
      <div class='flex gap-3 items-center'>
        <button
          onClick={addCount}
          class=' h-8 w-8 border-2 border-black text-lg'
        >
          +
        </button>
        <span class='count'>{count}</span>
        <button
          onClick={subCount}
          class=' h-8 w-8 border-2 border-black text-lg'
        >
          -
        </button>
      </div>
      {user != null && (
        <button
          onClick={addCart}
          class='bg-black text-white h-8 w-8 border-2 border-black text-lg'
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default Dish;
