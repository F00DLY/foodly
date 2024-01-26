'use client';
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
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import RestNav from '@/components/custom/RestNav';

const Menu = ({ params }) => {
  const name = Cookies.get('name');
  const id = Cookies.get('user');

  return (
    <>
      <RestNav name={name} />
      <h1 className='text-5xl my-5 mb-10 forprim font-bold'>Menu</h1>
      <AddMenu name={name} />
      <Menulist restaurantName={name} />
    </>
  );
};

export default Menu;
