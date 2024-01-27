import { faker } from '@faker-js/faker';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const deleteItem = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/cart/remove-cartitem',
        { itemId: item._id },
        {
          headers: {
            Authorization: 'Bearer' + Cookies.get('accessToken'),
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // toast.success(response.data.message);
        console.log(response.data);
        window.location.reload();
      } else {
        // toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
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
        <div className='text-lg font-bold'>{item.menuname}</div>
      </div>
      <div class='flex gap-3 items-center'>
        <span class='count'>{item.quantity}</span>
      </div>
      <div>
        <span>₹{item.menuprice * item.quantity}</span>
      </div>
      <div>
        <button
          onClick={deleteItem}
          className='backsec hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
