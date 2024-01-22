import React from 'react';

const Slogan = () => {
  return (
    <div className='flex flex-col h-20 w-full items-center justify-between font-bold mb-96'>
      <div className='up forprim w-[80%] items-center justify-center md:gap-4 gap-2 flex text-5xl mr-24'>
        ORDER WITH <span className='forsec'> EASE</span>
      </div>
      <div className='down forsec w-[80%] items-center justify-center md:gap-3 gap-2 flex text-5xl ml-24'>
        DINE WITH <span className='forprim'> EFFICIENCY</span>
      </div>
    </div>
  );
};

export default Slogan;
