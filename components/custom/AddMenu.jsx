'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddMenu = ({ name }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    restaurantName: { name },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/restaurant/menu-update',
        formData,
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.data);
        toast.success('Menu added successfully');
        setFormData({
          name: '',
          description: '',
          price: '',
          restaurantName: { name },
        });
        window.location.reload();
      } else {
        console.error('Menu add failed: 1', response.data);
        toast.error('Menu add failed ' + response.data.message);
      }
    } catch (error) {
      console.error('Menu add failed:', error);
      toast.error('Menu add failed ' + error.message);
    }
    // try {
    //   const response = await fetch(
    //     'http://localhost:8000/api/v1/restaurant/menu-update',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error('Menu update failed:', errorData);
    //     alert('Menu update failed' + errorData.message);
    //   } else {
    //     const responseData = await response.json();
    //     // console.log('Menu updated successfully:', responseData);
    //     toast.success('Menu updated successfully');
    //     window.location.reload();
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert('Error during menu update' + error.message);
    // }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Menu</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>Add Menu Item</DialogTitle>
          <DialogDescription>
            Add a new menu item to your restaurant
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <input
              id='name'
              value={formData.name}
              onChange={handleChange}
              className='col-span-3 h-10 px-2 rounded-md border-2 border-black'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <input
              id='description'
              value={formData.description}
              onChange={handleChange}
              className='col-span-3 h-10 px-2 rounded-md border-2 border-black'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              Price
            </Label>
            <input
              id='price'
              value={formData.price}
              onChange={handleChange}
              className='col-span-3 h-10 px-2 rounded-md border-2 border-black'
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='backprim' onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenu;
