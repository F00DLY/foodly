import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';

const RestList = () => {
  return (
    <div className=' min-h-40vh backprim shadow-2xl w-[90%] flex flex-row items-center justify-evenly object-right mr-[10%] rounded-r-xl py-10 my-24'>
      <Card className='w-[20%] hover:scale-105 h-[40vh] backsec text-white overflow-hidden border-0'>
        <img
          className='h-[30vh] w-full object-cover'
          src='/img/pizza.jpg'
          alt=''
        />
        <CardHeader className='h-[10vh] items-center justify-center p-0'>
          <CardTitle className='text-2xl font-bold p-0'>Dish Name</CardTitle>
        </CardHeader>
      </Card>
      <Card className='w-[20%] hover:scale-105 h-[40vh] backsec text-white overflow-hidden border-0'>
        <img
          className='h-[30vh] w-full object-cover'
          src='/img/pizza.jpg'
          alt=''
        />
        <CardHeader className='h-[10vh] items-center justify-center p-0 '>
          <CardTitle className='text-2xl font-bold p-0'>Dish Name</CardTitle>
        </CardHeader>
      </Card>
      <Card className='w-[20%] h-[40vh] hover:scale-105 backsec text-white overflow-hidden border-0'>
        <img
          className='h-[30vh] w-full object-cover'
          src='/img/pizza.jpg'
          alt=''
        />
        <CardHeader className='h-[10vh] items-center justify-center p-0'>
          <CardTitle className='text-2xl font-bold p-0'>Dish Name</CardTitle>
        </CardHeader>
      </Card>
      <CardHeader className='min-h-[30vh] w-[20%] justify-between p-0'>
        <CardTitle className='text-4xl font-bold p-0 forsec'>
          AND MANY MORE
        </CardTitle>
        <Link href='/'>
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
};

export default RestList;
