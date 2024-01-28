'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { faker } from '@faker-js/faker';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const LiveOrder = ({ item }) => {
  //   const [rating, setRating] = useState(0);
  //   const [hover, setHover] = useState(0);
  let total = 0;
  const { items } = item;
  items.forEach((item) => {
    total += item.orderPrice;
  });
  const handleCancel = () => {
    items.forEach((product) => {
      console.log(product._id);
      cancelOrder(product._id);
    });

    window.location.reload();
  };
  const cancelOrder = async (product) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/order/cancel-order',
        {
          orderid: product,
        },
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success('Cancelled');
        // window.location.reload();
      } else {
        toast.error('Error');
      }
      // console.log(res);
      // toast.success('Status Updated');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='item flex flex-row items-center hover:no-underline justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
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
          <div class='flex gap-3 items-center'>{items[0].status}</div>
          <div class='flex gap-3 items-center'>
            <button
              onClick={handleCancel}
              className='backsec hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
            >
              Cancel
            </button>
          </div>
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
            {/* <div className='text-2xl'>Rate your experience:</div> */}
            <div className='item__details__price'>
              Location: {items[0].address}
            </div>
            <div className='item__details__price'>Total: Rs.{total}</div>
            {/* <div className='star-rating'>
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

export default LiveOrder;
