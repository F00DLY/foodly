'use client';
import React from 'react';
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
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteRest = () => {
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/restaurant/profile-delet',
        {},
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Account deleted successfully');
        Cookies.remove('name');
        Cookies.remove('accessToken');
        window.location.replace('/');
      } else {
        toast.error('Account deletion failed');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  return (
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
  );
};

export default DeleteRest;
