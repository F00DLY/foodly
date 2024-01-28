'use client';
import LiveOrder from '@/components/custom/LiveOrders';
import Order from '@/components/custom/Order';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  // const [orderItems, setOrderItems] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [oldData, setOldData] = useState([]);
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/order/show-order',
          {},
          {
            headers: {
              Authorization: 'Bearer' + Cookies.get('accessToken'),
            },
          }
        );
        if (response.status === 200) {
          // console.log(response);
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
            entry.Resturentname === item.Resturantname &&
            item.address === entry.address
        );

        if (existingOrder) {
          existingOrder.items.push(item);
        } else {
          liveData.push({
            Resturentname: item.Resturantname,
            address: item.address,
            items: [item],
          });
        }
      } else {
        const existingOrder = oldData.find(
          (entry) =>
            entry.Resturentname === item.Resturantname &&
            item.address === entry.address
        );

        if (existingOrder) {
          existingOrder.items.push(item);
        } else {
          oldData.push({
            Resturentname: item.Resturantname,
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
      <h1 className='text-5xl my-5 mb-10 forprim font-bold'>Orders</h1>
      <h2 className='px-3 text-3xl my-5'>Live Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        {liveData.map((item) => (
          <LiveOrder key={item.items[0]._id} item={item} />
        ))}
      </div>
      <h2 className=' px-3 text-3xl my-5'>Past Orders</h2>
      <div className='flex flex-col w-full mb-10'>
        {oldData.map((item) => (
          <Order key={item.items[0]._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default Orders;
