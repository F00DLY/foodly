'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import RestNav from '@/components/custom/RestNav';
import DeleteRest from '@/components/custom/DeleteRest';
import RestPassChange from '@/components/custom/RestPassChange';

const Profile = () => {
  const [user, setUser] = useState('');
  const [activate, setActivate] = useState(user.active);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/v1/restaurant/account',
          {},
          {
            headers: {
              Authorization: `Bearer${Cookies.get('accessToken')}`,
            },
          }
        );
        console.log(' ||||||||||', res);
        if (res.data.statusCode === 200) {
          toast.success('Welcome');
          // console.log(res.data);
          setUser(res.data.message);
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.error(error.response);
        console.log(error);
      }
    };
    getProfile();
  }, []);

  const openShop = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/restaurant/close-open',
        {
          active: true,
        },
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setActivate(true);
        toast.success('Opened');
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeShop = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/restaurant/close-open',
        {
          active: false,
        },
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success('Closed');
        setActivate(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RestNav name={user.Restaurantname} />
      <h1 className='text-5xl my-5 mb-10 font-bold'>Profile</h1>

      <div className='flex flex-col w-full rounded-md bg-white shadow-lg pb-10 p-5'>
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Name:</h3>
          <div className='rounded-md w-[80%] font-semibold py-2 px-4  h-12 border-[1px] bg-gray-200 border-black text-md'>
            {user.Restaurantname}
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
        <div className='flex flex-col items-center justify-evenly h-[20vh] '>
          <h3 className=' text-lg w-[80%] text-left font-semibold'>Status:</h3>
        </div>
      </div>
      <div className='flex flex-col items-center justify-evenly h-[30vh]'>
        {activate === true ? (
          <button
            className='border-[1px] hover:scale-105 shadow-md bg-white w-[80%]  border-gray-400 mx-auto rounded-md font-semibold py-2 px-4  h-12'
            onClick={closeShop}
          >
            Close
          </button>
        ) : (
          <button
            className='border-[1px] hover:scale-105 shadow-md bg-white w-[80%]  border-gray-400 mx-auto rounded-md font-semibold py-2 px-4  h-12'
            onClick={openShop}
          >
            Open
          </button>
        )}
        <RestPassChange />
        <DeleteRest />
      </div>
    </>
  );
};

export default Profile;
