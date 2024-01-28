'use client';
import AdminData from '@/components/custom/AdminData';
import Footer from '@/components/custom/Footer';
import Navbar from '@/components/custom/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Admin = () => {
  const [restaurantNames, setRestaurantNames] = useState([]);

  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');

      const response = await axios.post(
        'http://localhost:8000/api/v1/admin/logout',
        {},
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );

      Cookies.remove('name');
      Cookies.remove('accessToken');
      console.log('Logout response:', response);

      if (response.status === 200) {
        console.log('User logged out successfully');
        toast.success('User logged out successfully');
        // alert('User logged out successfully');
        window.location.replace('/');
      } else {
        console.error('Logout failed:', response.data);
        // alert('Logout failed ' + response.data.message);
        toast.error('Logout failed ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // alert('Error during logout ' + error.message);
      toast.error('Error during logout ' + error.message);
    }
  };

  useEffect(() => {
    const fetchRestaurantNames = async () => {
      try {
        const endpoint = 'http://localhost:8000/api/v1/restaurant/get-names';
        const response = await axios.post(endpoint);
        const names = response.data.restaurants;
        setRestaurantNames(names);
        console.log('Restaurant names:', names);
        // console.log('Restaurant names:', names);
      } catch (error) {
        console.error('Error fetching restaurant names:', error.message);
      }
    };

    fetchRestaurantNames();
  }, []);

  return (
    <>
      <Navbar />
      <div className='mx-auto md:max-w-3xl w-[90%] min-h-80 mb-24'>
        <div>
          <h1 className='text-5xl my-5 mb-10 font-bold'>Admin</h1>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-2xl my-5 mb-10 font-bold'>Not Verified</h1>
          {restaurantNames.map((restaurant) =>
            restaurant.varified === false ? (
              <AdminData key={restaurant._id} name={restaurant} />
            ) : null
          )}
        </div>
        <div className='flex flex-col'>
          <h1 className='text-2xl my-5 mb-10 font-bold'>Verified</h1>
          {restaurantNames.map((restaurant) =>
            restaurant.varified ? (
              <AdminData key={restaurant._id} name={restaurant} />
            ) : null
          )}
        </div>
        <button
          onClick={handleLogout}
          className='border-[1px] hover:scale-105 shadow-md bg-white w-[80%]  border-gray-400 mx-auto rounded-md font-semibold py-2 px-4  h-12'
        >
          LogOut
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
