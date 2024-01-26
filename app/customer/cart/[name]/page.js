import React from 'react';

const Cart = () => {
  return (
    <>
      <div className='m-0 h-[80vh] rounded-b-2xl w-full backback shadow-2xl'>
        <div className='flex flex-row justify-between items-center h-[15vh] px-5'>
          <h1 className='text-3xl text-black w-[50%] text-wrap font-bold'>
            {restaurantName}
          </h1>
        </div>
      </div>
      <div className='flex flex-col w-full mt-14'>
        {cartItems.map((cartItem) => (
          <Dish key={cartItem._id} menuItem={cartItem} />
        ))}
      </div>
    </>
  );
};

export default Cart;
