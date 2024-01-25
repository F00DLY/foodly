'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import axios from 'axios';

const Menulist = ({ restaurantName }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (restaurantName) {
          const response = await axios.post(
            'http://localhost:8000/api/v1/restaurant/show-menu',
            {
              Restaurantname: restaurantName,
            }
          );

          const fetchedMenuItems = response.data.menu;
          setMenuItems(fetchedMenuItems);
          console.log('Menu items:', fetchedMenuItems);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    };

    fetchMenuItems();
  }, [restaurantName, setMenuItems]);

  return (
    <div className='flex flex-col w-full mb-10 min-h-40'>
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem._id} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Menulist;
