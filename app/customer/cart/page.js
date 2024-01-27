'use client';
// pages/cart.js
import CartItem from '@/components/custom/CartItem';
import { faker, tr } from '@faker-js/faker';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [rearrangedData, setRearrangedData] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/cart/show-cartitem',
          {},
          {
            headers: {
              Authorization: 'Bearer' + Cookies.get('accessToken'),
            },
          }
        );
        if (response.status === 200) {
          setCartItems(response.data.cartitem);

          rearrangeList(response.data.cartitem);
          // toast.success('cart item show successfully');
          // console.log('cart item show successfully');
          // console.log(response.data);
        } else {
          toast.error(response.data.message);
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);
  const rearrangeList = (list) => {
    const rearrangedData = [];
    list.forEach((item) => {
      // Check if there's already an entry for the restaurant in rearrangedData
      const existingRestaurant = rearrangedData.find(
        (entry) => entry.resturentname === item.resturentname
      );

      if (existingRestaurant) {
        existingRestaurant.items.push(item);
      } else {
        rearrangedData.push({
          resturentname: item.resturentname,
          items: [item],
        });
      }
    });
    setRearrangedData(rearrangedData);
    console.log('rearrangedData');
    console.log(rearrangedData);
  };

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Your Cart</h2>
        <p className='min-h-20'>Your cart is empty</p>
      </div>
    );
  } else {
    console.log('rearrangedData');
    console.log(rearrangedData);
    return (
      <div className='container mx-auto p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Your Cart</h2>
        {rearrangedData.map((item) => (
          <>
            <h2 className='text-2xl font-semibold mt-14'>
              {item.resturentname}
            </h2>
            <div className='flex flex-col w-full '>
              {item.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </>
        ))}
      </div>
    );
  }
};

export default CartPage;
