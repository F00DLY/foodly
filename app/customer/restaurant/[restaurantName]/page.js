'use client';
import Dish from '@/components/custom/Dish';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Restaurant = ({ params }) => {
  const restaurantName = decodeURIComponent(params.restaurantName);
  // const decodedString = encodedString);
  let rating = 4;
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (restaurantName) {
          const response = await axios.post(
            'http://localhost:8000/api/v1/restaurant/show-menu',
            {
              Restaurantname: restaurantName,
            }
          );

          const fetchedMenuItems = response.data.menu;
          setMenuItems(fetchedMenuItems);
          // console.log('Menu items:', fetchedMenuItems);
        } else {
          console.error('Restaurant name is undefined');
        }
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    };

    fetchMenuItems();
  }, [restaurantName]);

  return (
    <>
      <div className='m-0 h-[80vh] rounded-b-2xl w-full backback shadow-2xl'>
        <div className='w-full h-[65vh] overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src={faker.image.urlLoremFlickr({ category: 'food' })}
            alt='gvbhjk'
          />
        </div>
        <div className='flex flex-row justify-between items-center h-[15vh] px-5'>
          <h1 className='text-3xl text-black w-[50%] text-wrap font-bold'>
            {restaurantName}
          </h1>
          <div className='star-rating'>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <span
                  key={index}
                  className={index <= rating ? 'on' : 'off'}
                  style={{ height: '2rem', width: '2rem' }}
                >
                  <span className='star text-3xl'>&#9733;</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full mt-14'>
        {menuItems.map((menuItem) => (
          <Dish key={menuItem._id} menuItem={menuItem} />
        ))}
      </div>
    </>
  );
};

export default Restaurant;
