// pages/cart.js
import React from 'react';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 15, quantity: 3, image: 'product3.jpg' },
  ]; // Example cart items

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Your Cart</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cartItems.map((item) => (
          <div key={item.id} className='bg-white p-4 shadow-md rounded-md'>
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              className='w-full h-40 object-cover mb-4'
            />
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold'>{item.name}</h3>
                <p className='text-gray-600'>${item.price}</p>
                <p className='text-gray-600'>Quantity: {item.quantity}</p>
              </div>
              <button className='bg-blue-500 text-white px-3 py-1 rounded-md'>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
