'use client';
import LiveRestOrder from '@/components/custom/LiveRestOrder';
import OrderRest from '@/components/custom/OrderRest';
import RestNav from '@/components/custom/RestNav';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const name = Cookies.get('name');
  // const [orderItems, setOrderItems] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [oldData, setOldData] = useState([]);
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/restaurant/resturent-show-order',
          {},
          {
            headers: {
              Authorization: 'Bearer' + Cookies.get('accessToken'),
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          rearrangeList(response.data);
          // toast.success('Order item show successfully');
          // console.log('Order item show successfully');
          // console.log(response.data);
        } else {
          toast.error(response.data.message);
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderItems();
  }, []);

  const rearrangeList = (list) => {
    const liveData = [];
    const oldData = [];
    list.forEach((item) => {
      // Check if there's already an entry for the restaurant in newData and oldData
      if (item.status === 'PENDING') {
        const existingOrder = liveData.find(
          (entry) =>
            entry.username === item.username && item.address === entry.address
        );

        if (existingOrder) {
          existingOrder.items.push(item);
        } else {
          liveData.push({
            username: item.username,
            address: item.address,
            items: [item],
          });
        }
      } else {
        const existingOrder = oldData.find(
          (entry) =>
            entry.username === item.username && item.address === entry.address
        );

        if (existingOrder) {
          existingOrder.items.push(item);
        } else {
          oldData.push({
            username: item.username,
            address: item.address,
            items: [item],
          });
        }
      }
    });
    setLiveData(liveData);
    setOldData(oldData);
  };

  return (
    <>
      <RestNav name={name} />
      <h1 className='text-5xl my-5 mb-10 forprim font-bold'>Orders</h1>
      <h2 className='px-3 text-3xl my-5'>Live Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        {liveData.map((item) => (
          <LiveRestOrder key={item.items[0]._id} item={item} />
        ))}
      </div>
      <h2 className=' px-3 text-3xl my-5'>Past Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        {oldData.map((item) => (
          <OrderRest key={item.items[0]._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default Orders;
