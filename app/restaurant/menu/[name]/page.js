import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Menulist from '@/components/custom/Menulist';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddMenu from '@/components/custom/AddMenu';

const Menu = ({ params }) => {
  const name = decodeURIComponent(params.name);
  // const [menuItems, setMenuItems] = useState([]);

  // useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       if (restaurantName) {
  //         const response = await axios.post(
  //           'http://localhost:8000/api/v1/restaurant/show-menu',
  //           {
  //             Restaurantname: restaurantName,
  //           }
  //         );

  //         const fetchedMenuItems = response.data.menu;
  //         setMenuItems(fetchedMenuItems);
  //         console.log('Menu items:', fetchedMenuItems);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching menu items:', error.message);
  //     }
  //   };

  //   fetchMenuItems();
  // }, [restaurantName]);

  return (
    <>
      <div className='w-[100%] h-20 flex flex-row justify-around align-middle'>
        <Link href='/'>
          <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
            <Image src='/img/logo.png' width={160} height={80} />
          </div>
        </Link>
        <div className='flex flex-row justify-evenly items-center text-2xl w-[50%]'>
          <Link href={'/restaurant/orders/' + name}>
            <span className='hover:scale-105 '>Orders</span>
          </Link>
          <Link href={'/restaurant/menu/' + name}>
            <span className='hover:scale-105 '>Menu</span>
          </Link>
        </div>

        <div className='logo flex flex-row justify-between align-middle overflow-hidden'>
          <DropdownMenu className='w-[20%]'>
            <DropdownMenuTrigger className='w-16 h-16 rounded-full'>
              <Avatar className='w-16 h-16 rounded-full'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='h-[50vh] w-[30vh]'>
              <DropdownMenuLabel></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem href={'/restaurant/menu/' + name}>
                Menu
              </DropdownMenuItem>
              <DropdownMenuItem href={'/restaurant/orders/' + name}>
                Orders
              </DropdownMenuItem>
              <Link href='/'>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <h1 className='text-5xl my-5 mb-10 forprim font-bold'>Menu</h1>
      <AddMenu name={name} />
      <Menulist restaurantName={name} />
    </>
  );
};

export default Menu;
