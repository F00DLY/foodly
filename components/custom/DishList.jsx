import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';

const DishList = () => {
  return (
    <div className=' min-h-40vh bg-white shadow-2xl w-[90%] flex flex-row items-center justify-evenly object-right ml-[10%] rounded-l-xl py-10 mb-24 mt-10'>
      <Card className='w-[20%] hover:scale-105  h-[40vh] backsec text-white overflow-hidden'>
        <img
          className='h-[30vh] w-full object-cover'
          src='img/pizza.jpg'
          alt=''
        />
        <CardHeader className='h-[10vh] items-center justify-center p-0'>
          <CardTitle className='text-2xl font-bold p-0'>Dish Name</CardTitle>
        </CardHeader>
      </Card>
      <Card className='w-[20%] h-[40vh] hover:scale-105  backsec text-white overflow-hidden'>
        <img
          className='h-[30vh] w-full object-cover'
          src='img/pizza.jpg'
          alt=''
        />
        <CardHeader className='h-[10vh] items-center justify-center p-0'>
          <CardTitle className='text-2xl font-bold p-0'>Dish Name</CardTitle>
        </CardHeader>
      </Card>
      <Card className='w-[20%] h-[40vh] hover:scale-105 backsec text-white overflow-hidden'>
        <img
          className='h-[30vh] w-full object-cover'
          src='img/pizza.jpg'
          alt=''
        />
        <CardHeader className='h-[10vh] items-center justify-center p-0'>
          <CardTitle className='text-2xl font-bold p-0'>Dish Name</CardTitle>
        </CardHeader>
      </Card>
      <CardHeader className='h-[10vh] w-[20%] justify-center p-0'>
        <Link href='/customer/restaurant'>
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
          JOHN RESTAURANT
        </CardTitle>
      </CardHeader>
    </div>
  );
};

export default DishList;
