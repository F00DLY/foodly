'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import Link from 'next/link';

const SearchBar = () => {
  const [restaurantNames, setRestaurantNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const fetchRestaurantNames = async () => {
      try {
        const endpoint = 'http://localhost:8000/api/v1/restaurant/get-names';
        const response = await axios.post(endpoint);
        const names = response.data.restaurants;
        setRestaurantNames(names);
        // console.log('Restaurant names:', names);
      } catch (error) {
        console.error('Error fetching restaurant names:', error.message);
      }
    };

    fetchRestaurantNames();
  }, []);

  // Function to handle search query changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter restaurant names based on search query
  const filteredNames = restaurantNames.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputFocus = () => {
    setTimeout(() => {
      setInputFocused(true);
    }, 100);
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setTimeout(() => {
      setInputFocused(false);
    }, 1000);
  };

  return (
    <>
      <div className='h-[10vh] md:w-[45%] w-[100%] flex flex-row justify-between p-2 items-center backprim rounded-[5vh]'>
        <Input
          className='h-[10vh] w-[80%] border-none text-white text-2xl font-bold'
          placeholder='Search restaurants...'
          value={searchQuery} // Bind value to searchQuery state
          onChange={handleSearchChange}
          onFocus={handleInputFocus} // Handle input focus
          onBlur={handleInputBlur}
        />
        <Button className='h-[9vh] w-[9vh] p-0 backsec rounded-full grid content-center'>
          <img className='h-[5vh] w-[5vh] invert' src='img/arrow.svg' alt='' />
        </Button>
        {inputFocused && (
          <ul className='absolute max-h-[45%] md:top-80 top-96 w-80 bg-white rounded-lg shadow-lg z-10 overflow-y-scroll'>
            {filteredNames.map((restaurant, index) => (
              <Link
                href={`/customer/restaurant/${restaurant.name}`}
                key={index}
              >
                <li
                  key={index}
                  className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                >
                  {restaurant.name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
