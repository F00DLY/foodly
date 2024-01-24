import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SearchBar from '../components/custom/SearchBar';
import Header from '../components/custom/Header';
import DishList from '@/components/custom/DishList';
import RestList from '@/components/custom/RestList';
import Slogan from '@/components/custom/Slogan';
import Footer from '@/components/custom/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-evenly p-24'>
        <div className='max-w-5xl w-full items-center justify-between flex flex-row flex-wrap'>
          <div className='text-wrap md:w-[50%] w-[100%] forprim lg:text-6xl md:text-4xl sm:text-6xl text-4xl  font-semibold'>
            ORDER F<span className='forsec'>OO</span>D IN YOUR CAMPUS NOW!
          </div>
          <SearchBar />
        </div>
      </main>

      <DishList />
      <RestList />
      <Slogan />
      <Footer />
    </>
  );
}
