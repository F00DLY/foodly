import Link from 'next/link';
import React from 'react';

const Restaurant = () => {
  let rating = 3.7;
  return (
    <div className='flex flex-col max-w-[30%] min-w-32'>
      <div className='w-[90%] h-[20vh] overflow-hidden'>
        <img
          alt='Restaurant Card'
          className='h-full w-full object-cover'
          src='https://b.zmtcdn.com/data/pictures/chains/9/2400349/e81f66522df2f3dbc3c9d0aa3ce0756d_o2_featured_v2.jpg?output-format=webp'
        />
      </div>
      <div className='flex flex-col justify-evenly items-start px-1'>
        <div className='text-lg text-black w-full text-wrap font-bold'>
          John Restaurant
        </div>
        <div className='flex flex-row w-20 items-center'>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <span
                key={index}
                className={index <= rating ? 'on' : 'off'}
                style={{ height: '1.5rem', width: '1.5rem' }}
              >
                <span className='star text-lg'>&#9733;</span>
              </span>
            );
          })}
          <span className='flex flex-row w-20 flex-nowrap text-nowrap text-sm'>
            {rating} stars
          </span>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
