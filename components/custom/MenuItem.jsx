import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MenuItem = ({ menuItem }) => {
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
    </div>
  );
};

export default MenuItem;
