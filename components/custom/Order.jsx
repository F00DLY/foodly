'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { faker } from '@faker-js/faker';

const Order = ({ item }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  let total = 0;
  const { items } = item;
  items.forEach((item) => {
    total += item.orderPrice;
  });
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='item hover:no-underline flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
          <div className='flex flex-row items-center justify-around gap-5 flex-wrap'>
            <div className=' h-[15vh] w-[15vh]'>
              <img
                className='h-full w-full object-cover'
                src={faker.image.urlLoremFlickr({ category: 'food' })}
                alt=''
              />
            </div>
            <div className='item__details__title'>
              <div className='font-bold'>{item.Resturentname}</div>
            </div>
          </div>
          <div className='item__details__title'>
            <div className='font-bold'>Location: {item.address}</div>
          </div>

          <div class='flex gap-3 items-center'>{items[0].status}</div>
        </AccordionTrigger>
        <AccordionContent>
          {items.map((item) => {
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
                  <div className='item__details__title'>{item.productname}</div>
                </div>
                <div class='flex gap-3 items-center'>
                  <span class='count'>{item.quantity}</span>
                </div>
                <div className='item__details__price'>
                  Rs.{item.orderPrice}{' '}
                </div>
              </div>
            );
          })}
          <div className='foot flex flex-row items-center justify-between px-5 h-[10vh]'>
            <div className='item__details__price'>Rs.{total}</div>
            {/* <div className='text-2xl'>Rate your experience:</div>
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
            </div> */}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Order;
