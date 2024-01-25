import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SearchBar = () => {
  return (
    <div className='h-[10vh] hover:scale-105 md:w-[45%] w-[100%] flex flex-row justify-between p-2 items-center backprim rounded-[5vh]'>
      <Input
        className='h-[10vh] w-[80%] border-none text-white text-2xl font-bold'
        placeholder='Search restaurants...'
      />
      <Button className='h-[9vh] w-[9vh] p-0 backsec rounded-full grid content-center'>
        <img className='h-[5vh] w-[5vh] invert' src='img/arrow.svg' alt='' />
      </Button>
    </div>
  );
};

export default SearchBar;
