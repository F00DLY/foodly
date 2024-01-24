'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const Order = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
          <div className='flex flex-row items-center gap-5'>
            <div className=' h-[15vh] w-[15vh]'>
              <img
                className='h-full w-full object-cover'
                src='/img/pizza.jpg'
                alt=''
              />
            </div>
            <div className='item__details__title'>
              <div className='font-bold'>Dish Name</div>
              <div className='text-sm'>Quantity</div>
            </div>
          </div>
          <div className='item__details__price'>Price</div>
          <div class='flex gap-3 items-center'>Status</div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
            <div className='flex flex-row items-center gap-5'>
              <div className=' h-[15vh] w-[15vh]'>
                <img
                  className='h-full w-full object-cover'
                  src='/img/pizza.jpg'
                  alt=''
                />
              </div>
              <div className='item__details__title'>Dish Name</div>
            </div>
            <div className='item__details__price'>Price</div>
            <div class='flex gap-3 items-center'>
              <span class='count'>4</span>
            </div>
          </div>
          <div className='foot flex flex-row items-center justify-between px-5 h-[10vh]'>
            <div className='text-2xl'>Rate your experience:</div>
            <div className='star-rating'>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type='button'
                    key={index}
                    className={
                      index <= ((rating && hover) || hover) ? 'on' : 'off'
                    }
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                    style={{ height: '2rem', width: '2rem' }}
                  >
                    <span className='star text-3xl'>&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Order;
