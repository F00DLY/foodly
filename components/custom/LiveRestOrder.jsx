'use client';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const LiveRestOrder = ({ item }) => {
  //   const [rating, setRating] = useState(0);
  //   const [hover, setHover] = useState(0);

  // const [status, setStatus] = useState(item.items[0].status);
  let total = 0;
  const { items } = item;

  items.forEach((item) => {
    total += item.orderPrice;
  });

  const changeValue = (value) => {
    items.forEach((product) => {
      updateValue(value, product);
    });
    window.location.reload();
  };

  const updateValue = async (value, product) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/restaurant/order-status-change',
        {
          orderid: product._id,
          status: value,
        },
        {
          headers: {
            Authorization: `Bearer${Cookies.get('accessToken')}`,
          },
        }
      );
      if (res.status === 200) {
        // toast.success('Status Updated');
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
        <AccordionTrigger className=' hover:no-underline item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
          <div className='flex flex-row items-center justify-around gap-5 flex-wrap'>
            <div className=' h-[15vh] w-[15vh]'>
              <img
                className='h-full w-full object-cover'
                src={faker.image.urlLoremFlickr({ category: 'food' })}
                alt=''
              />
            </div>
            <div className='item__details__title'>
              <div className='font-bold'>{item.username}</div>
            </div>
          </div>
          <div className='item__details__title'>
            <div className='font-bold'>Location: {items[0].address}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {items.map((item) => {
            return (
              <div className='item flex flex-row items-center justify-between p-5 backback border-b-2 border-gray-200 text-black w-full '>
                <div className='flex flex-row items-center gap-5 w-[50%]'>
                  <div className=' h-[15vh] w-[15vh]'>
                    <img
                      className='h-full w-full object-cover'
                      src={faker.image.urlLoremFlickr({ category: 'food' })}
                      alt=''
                    />
                  </div>
                  <div className='item__details__title'>{item.productname}</div>
                </div>
                <div class='flex gap-3 items-center w-[10%] content-center'>
                  <span class='count'>{item.quantity}</span>
                </div>
                <div className='item__details__price w-[30%] text-right'>
                  Total: Rs.{item.orderPrice}{' '}
                </div>
              </div>
            );
          })}
          <div className='foot flex flex-row items-center justify-between px-5 h-[10vh]'>
            <div className='text-2xl'>Rate your experience:</div>
            <div class='flex gap-3 items-center'>
              <Select
                onValueChange={(value) => {
                  changeValue(value);
                }}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='PENDING'>Pending</SelectItem>
                  <SelectItem value='CANCELLED'>Cancelled</SelectItem>
                  <SelectItem value='DELIVERED'>Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='item__details__price'>Rs.{total}</div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LiveRestOrder;
