// pages/cart.js
import CartItem from '@/components/custom/CartItem';
import { faker } from '@faker-js/faker';
import React from 'react';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 15, quantity: 3, image: 'product3.jpg' },
  ]; // Example cart items

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Your Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  } else {
    return (
      <div className='container mx-auto p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Your Cart</h2>
        <div className='flex flex-col w-full mt-14'>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }
};

export default CartPage;
