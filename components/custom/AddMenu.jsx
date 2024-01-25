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
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     restaurantName: name,
  //   }));

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/restaurant/menu-update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Handle error responses from the server
        const errorData = await response.json();
        console.error('Menu update failed:', errorData);
        alert('Menu update failed' + errorData.message);
      } else {
        // Menu update successful
        const responseData = await response.json();
        console.log('Menu updated successfully:', responseData);
        toast.success('Menu updated successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert('Error during menu update' + error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Menu</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
