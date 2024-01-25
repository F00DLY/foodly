'use client';
import Restaurant from '@/components/custom/Restaurant';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Restaurants = () => {
  const [restaurantNames, setRestaurantNames] = useState([]);

  useEffect(() => {
    const fetchRestaurantNames = async () => {
      try {
        const endpoint = 'http://localhost:8000/api/v1/restaurant/get-names';
        const response = await axios.post(endpoint);
        const names = response.data.restaurants;
        setRestaurantNames(names);
        console.log('Restaurant names:', names);
      } catch (error) {
        console.error('Error fetching restaurant names:', error.message);
      }
    };

    fetchRestaurantNames();
  }, []);

  // Call the function to get restaurant names
  return (
    <div className='flex flex-row flex-wrap justify-around'>
      {restaurantNames.map((restaurant) => (
        <Restaurant key={restaurant._id} name={restaurant.name} />
      ))}
    </div>
  );
};

export default Restaurants;
