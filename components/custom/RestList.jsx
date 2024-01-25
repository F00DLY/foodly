'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import axios from 'axios';

const RestList = () => {
  const [restaurantNames, setRestaurantNames] = useState([]);

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
  if (restaurantNames[0]) {
    return (
      <div className=' min-h-40vh backprim shadow-2xl w-[90%] flex flex-row items-center justify-evenly object-right mr-[10%] rounded-r-xl py-10 my-24'>
        <Card className='w-[20%] md:flex flex-col hidden hover:scale-105 h-[40vh] backsec text-white overflow-hidden border-0'>
          <Link href={'/customer/restaurant/' + restaurantNames[0].name}>
            <img
              className='h-[30vh] w-full object-cover'
              src='/img/pizza.jpg'
              alt=''
            />
            <CardHeader className='h-[10vh] items-center justify-center p-0'>
              <CardTitle className='text-2xl font-bold p-0'>
                {restaurantNames[0].name}
              </CardTitle>
            </CardHeader>
          </Link>
        </Card>
        <Card className='w-[20%] md:flex flex-col hidden hover:scale-105 h-[40vh] backsec text-white overflow-hidden border-0'>
          <Link href={'/customer/restaurant/' + restaurantNames[1].name}>
            <img
              className='h-[30vh] w-full object-cover'
              src='/img/pizza.jpg'
              alt=''
            />
            <CardHeader className='h-[10vh] items-center justify-center p-0 '>
              <CardTitle className='text-2xl font-bold p-0'>
                {restaurantNames[1].name}
              </CardTitle>
            </CardHeader>
          </Link>
        </Card>
        <Card className='md:w-[20%] w-[40%] h-[40vh] hover:scale-105 backsec text-white overflow-hidden border-0'>
          <Link href={'/customer/restaurant/' + restaurantNames[2].name}>
            <img
              className='h-[30vh] w-full object-cover'
              src='/img/pizza.jpg'
              alt=''
            />
            <CardHeader className='h-[10vh] items-center justify-center p-0'>
              <CardTitle className='text-2xl font-bold p-0'>
                {restaurantNames[2].name}
              </CardTitle>
            </CardHeader>
          </Link>
        </Card>
        <CardHeader className='min-h-[30vh] md:w-[20%] w-[40%] justify-between p-0'>
          <CardTitle className='text-4xl font-bold p-0 forsec'>
            AND MANY MORE
          </CardTitle>
          <Link href='/customer/restaurants'>
            <div className='h-[8vh] hover:scale-105 w-[100%] flex flex-row justify-between p-2 items-center backsec rounded-[5vh]'>
              <span className='text-white xl:ml-16 lg:ml-10 ml-5 text-nowrap'>
                EXPLORE
              </span>
              <span className='h-[7vh] w-[7vh] p-0 backprim rounded-full flex items-center justify-center'>
                <img
                  className='h-[5vh] w-[5vh] invert'
                  src='/img/right.svg'
                  alt=''
                />
              </span>
            </div>
          </Link>
        </CardHeader>
      </div>
    );
  } else {
    // Render a loading state or placeholder while waiting for data
    return <div>Loading...</div>;
  }
};

export default RestList;
