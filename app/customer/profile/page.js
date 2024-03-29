'use client';
import DeleteUser from '@/components/custom/DeleteUser';
import UserPassChange from '@/components/custom/UserPassChange';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/v1/users/profile',
          {},
          {
            headers: {
              Authorization: `Bearer${Cookies.get('accessToken')}`,
            },
          }
        );
        if (res.status === 200) {
          // toast.success('Welcome');
          // console.log(res.data);
          console.log(res.data.message);
          setUser(res.data.message);
        } else {
          toast.error('Something went wrong');
          // console.log(res);
        }
      } catch (error) {
        toast.error(error.response);
        console.log(error);
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <h1 className='text-5xl my-5 mb-10 font-bold'>Profile</h1>

      <div className='flex flex-col w-full rounded-md bg-white shadow-lg pb-10 p-5'>
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Name:</h3>
          <div className='rounded-md w-[80%] font-semibold py-2 px-4  h-12 border-[1px] bg-gray-200 border-black text-md'>
            {user.Name}
          </div>
        </div>
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Email:</h3>
          <div className='rounded-md w-[80%] font-semibold py-2 px-4  h-12 border-[1px] bg-gray-200 border-black text-md'>
            {user.email}
          </div>
        </div>
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Number:</h3>
          <div className='rounded-md w-[80%] font-semibold py-2 px-4  h-12 border-[1px] bg-gray-200 border-black text-md'>
            {user.mobail}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-evenly h-[30vh]'>
        <UserPassChange />
        <DeleteUser />
      </div>
    </>
  );
};

export default Profile;
