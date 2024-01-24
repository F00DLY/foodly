import Dish from '@/src/components/custom/Dish';
import React from 'react';

const Restaurant = () => {
  let rating = 4;
  return (
    <>
      <div className='m-0 h-[80vh] rounded-b-2xl w-full backback shadow-2xl'>
        <div className='w-full h-[65vh] overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src='/img/pizza.jpg'
            alt='gvbhjk'
          />
        </div>
        <div className='flex flex-row justify-between items-center h-[15vh] px-5'>
          <h1 className='text-3xl text-black w-[50%] text-wrap font-bold'>
            John Restaurant
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
      <div className='flex flex-col w-full mt-14 backprim min-h-10'>
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
      </div>
    </>
  );
};

export default Restaurant;
