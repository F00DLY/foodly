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

const RestPassChange = () => {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const handleNewChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleOldChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/restaurant/password-change',
        {
          oldpassword,
          newpassword,
        },
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success('Password changed successfully');
        window.location.reload();
      } else {
        toast.error('Password change failed');
      }
    } catch (error) {
      const htmlResponse = await error.response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlResponse, 'text/html');

      const errorMessage = doc
        .querySelector('pre')
        .textContent.trim()
        .split('at');

      toast.error(errorMessage[0]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='border-[1px] hover:scale-105 shadow-md bg-white w-[80%]  border-gray-400 mx-auto rounded-md font-semibold py-2 px-4  h-12'>
          Change Password
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='oldpassword' className='text-right'>
              Old Password
            </Label>
            <input
              id='oldpassword'
              value={oldpassword}
              onChange={handleOldChange}
              className='col-span-3 h-10 px-2 rounded-md border-2 border-black'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              New Password
            </Label>
            <input
              id='newpassword'
              value={newpassword}
              onChange={handleNewChange}
              className='col-span-3 h-10 px-2 rounded-md border-2 border-black'
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='backprim' onClick={handleChangePassword}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestPassChange;
