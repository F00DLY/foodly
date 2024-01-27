'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { faker } from '@faker-js/faker';
import Link from 'next/link';
import axios from 'axios';

const DishList = () => {
  const [restaurantNames, setRestaurantNames] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchRestaurantNames = async () => {
      try {
        const endpoint = 'http://localhost:8000/api/v1/restaurant/get-names';
        const response = await axios.post(endpoint);
        const names = response.data.restaurants;
        setRestaurantNames(names);
        console.log('Restaurant names:', names);
      } catch (error) {
        console.error('Error fetching restaurant names:', error.message);
      }
    };

    fetchRestaurantNames();
  }, []);
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/restaurant/show-menu',
          {
            Restaurantname: restaurantNames[1].name,
          }
        );

        const fetchedMenuItems = response.data.menu;
        setMenuItems(fetchedMenuItems);
        console.log('Menu items:', fetchedMenuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    };

    fetchMenuItems();
  }, [restaurantNames]);
  if (restaurantNames[1] && menuItems[2]) {
    return (
      <div className=' min-h-40vh bg-white shadow-2xl w-[90%] flex flex-row items-center justify-evenly object-right ml-[10%] rounded-l-xl py-10 mb-24 mt-10'>
        <Card className='w-[20%] md:flex flex-col hidden hover:scale-105 h-[40vh] backsec text-white overflow-hidden'>
          <img
            className='h-[30vh] w-full object-cover'
            src={faker.image.urlLoremFlickr({ category: 'food' })}
            alt=''
          />
          <CardHeader className='h-[10vh] items-center justify-center p-0'>
            <CardTitle className='text-2xl font-bold p-0'>
              {menuItems[0].name}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className='w-[20%] md:flex flex-col hidden h-[40vh] hover:scale-105  backsec text-white overflow-hidden'>
          <img
            className='h-[30vh] w-full object-cover'
            src={faker.image.urlLoremFlickr({ category: 'food' })}
            alt=''
          />
          <CardHeader className='h-[10vh] items-center justify-center p-0'>
            <CardTitle className='text-2xl font-bold p-0'>
              {menuItems[1].name}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className='md:w-[20%] w-[40%] h-[40vh] hover:scale-105 backsec text-white overflow-hidden'>
          <img
            className='h-[30vh] w-full object-cover'
            src={faker.image.urlLoremFlickr({ category: 'food' })}
            alt=''
          />
          <CardHeader className='h-[10vh] items-center justify-center p-0'>
            <CardTitle className='text-2xl font-bold p-0'>
              {menuItems[2].name}
            </CardTitle>
          </CardHeader>
        </Card>
        <CardHeader className='h-[10vh] md:w-[20%] w-[40%] justify-center p-0'>
          <Link href={'/customer/restaurant/' + restaurantNames[1].name}>
            <div className='h-[8vh] hover:scale-105 w-[100%] flex flex-row justify-between p-2 items-center backprim rounded-[5vh]'>
              <span className='text-white xl:ml-16 lg:ml-10 ml-5 text-nowrap'>
                See All
              </span>
              <span className='h-[7vh] w-[7vh] p-0 backsec rounded-full flex items-center justify-center'>
                <img
                  className='h-[5vh] w-[5vh] invert'
                  src='img/right.svg'
                  alt=''
                />
              </span>
            </div>
          </Link>
          <CardTitle className='text-4xl font-bold p-0 forsec'>
            OFFERED BY
          </CardTitle>
          <CardTitle className='text-4xl font-bold p-0 text-wrap forprim'>
            {restaurantNames[1].name}
          </CardTitle>
        </CardHeader>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default DishList;
