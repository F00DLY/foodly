import Link from 'next/link';
import React from 'react';

const Restaurant = ({ name }) => {
  let rating = 3.7;
  return (
    <div className='flex flex-col min-w-32 w-[30%] rounded-lg shadow-2xl hover:scale-105 p-2'>
      <Link href={`/customer/restaurant/${name}`}>
        <div className='w-[90%] h-[20vh] overflow-hidden mx-auto mt-2'>
          <img
            alt='Restaurant Card'
            className='h-full w-full object-cover rounded-md'
            src='/img/pizza.jpg'
          />
        </div>
        <div className='flex flex-col justify-evenly items-start px-1'>
          <div className='text-lg text-black w-full text-wrap font-bold'>
            {name}
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
      </Link>
    </div>
  );
};

export default Restaurant;
