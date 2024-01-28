import { faker, tr } from '@faker-js/faker';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const AdminData = ({ name }) => {
  const verify = async () => {
    console.log(name);
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/admin/verify',
        {
          varified: true,
          restaurantid: name.id,
        }
      );
      if (res.status === 200) {
        toast.success('Verified');
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unverify = async () => {
    try {
      console.log(name);
      const res = await axios.post(
        'http://localhost:8000/api/v1/admin/verify',
        {
          varified: false,
          restaurantid: name.id,
        }
      );
      if (res.status === 200) {
        toast.success('Unverified');
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
      <div className='flex flex-row items-center gap-5'>
        <div className=' h-[15vh] w-[15vh]'>
          <img
            className='h-full w-full object-cover'
            src={faker.image.urlLoremFlickr({ category: 'food' })}
            alt=''
          />
        </div>
        <div>{name.name}</div>
      </div>
      <div className='item__details__price'>
        {name.varified === true ? (
          <button onClick={unverify} className='text-lg font-bold'>
            Unverify
          </button>
        ) : (
          <button onClick={verify} className='text-lg font-bold'>
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminData;
