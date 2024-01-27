'use client';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
import RestNav from '@/components/custom/RestNav';

const Profile = () => {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const handleNewChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleOldChange = (e) => {
    setOldPassword(e.target.value);
  };

  const name = Cookies.get('name');

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
      if (response.status === 200) {
        toast.success('Password changed successfully');
        window.location.reload();
      } else {
        toast.error('Password change failed');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:8000/api/v1/restaurant/account-delet',
        {},
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Account deleted successfully');
        window.location.reload();
      } else {
        toast.error('Account deletion failed');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  return (
    <>
      <RestNav name={name} />
      <h1 className='text-5xl my-5 mb-10 font-bold'>{name}</h1>

      <div className='flex flex-col w-full rounded-md bg-white shadow-lg pb-10 p-5'>
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Name:</h3>
          <div className='rounded-md w-[80%] font-semibold py-2 px-4  h-12 border-[1px] bg-gray-200 border-black text-md'>
            {name}
          </div>
        </div>
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Email:</h3>
          <div className='rounded-md w-[80%] font-semibold py-2 px-4  h-12 border-[1px] bg-gray-200 border-black text-md'>
            {name}
          </div>
        </div>
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Number:</h3>
          <div className='rounded-md w-[80%] font-semibold py-2 px-4  h-12 border-[1px] bg-gray-200 border-black text-md'>
            {name}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-evenly h-[30vh]'>
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
        <AlertDialog>
          <AlertDialogTrigger className='border-[1px] hover:scale-105 shadow-md bg-white w-[80%]  border-gray-400 mx-auto rounded-md font-semibold py-2 px-4  h-12'>
            <span>Delete Account</span>
          </AlertDialogTrigger>
          <AlertDialogContent className={'bg-white'}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className={'text-gray-900'}>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={'bg-gray-400 hover:bg-slate-600'}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className={'bg-black hover:bg-gray-900'}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Profile;
