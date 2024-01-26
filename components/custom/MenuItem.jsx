import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { toast } from 'react-toastify';

const MenuItem = ({ menuItem, Restaurantname }) => {
  const menuItemId = menuItem._id;

  const handelRemove = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/restaurant/menu-remove',
        {
          Restaurantname,
          menuItemId,
        }
      );

      if (response.status === 200) {
        toast.success('Menu item removed successfully');
        window.location.reload();
      } else {
        toast.error('Failed to remove menu item');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
      <div className='flex flex-row items-center gap-5'>
        <div className='item__details__title'>{menuItem.name}</div>
      </div>
      <div className='item__details__price'>{menuItem.price}</div>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='available'>Available</SelectItem>
          <SelectItem value='unavailable'>Unavailable</SelectItem>
        </SelectContent>
      </Select>
      <button onClick={handelRemove}>remove</button>
    </div>
  );
};

export default MenuItem;
