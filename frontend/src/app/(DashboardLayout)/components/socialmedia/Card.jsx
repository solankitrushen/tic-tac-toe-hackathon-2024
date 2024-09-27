'use client'; 

import React from 'react';
import Image from 'next/image';
import { IconHeart, IconUserCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'; // Ensure you import useRouter

export default function Card({ image, title, username, desc, link, likes }) {
  const router = useRouter(); // Initialize the router

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div 
      className="w-64 h-86 rounded-lg overflow-hidden shadow-md p-4 m-4 bg-black shadow-zinc-600 flex flex-col" 
      onClick={() => router.push(link)} // Handle click event
    >
      <div className="relative h-36 w-full mb-4">
        <Image 
          src={image} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="px-3 pt-4 mb-2">
          <div className="font-bold text-xl mb-2">{truncateText(title, 17)}</div>
          <p className="text-gray-700 text-base">
            {truncateText(desc, 59)}
          </p>
        </div>
        <div className='flex justify-between mt-auto'>
          <p className="text-gray-700 text-sm text-base flex ">
            <IconHeart className='mr-2 w-5'/>
            {truncateText(likes)}
          </p>
          <p className="text-gray-700 text-sm text-base flex ">
            <IconUserCircle className='mr-2 w-5'/>
            {truncateText(username, 15)}
          </p>
        </div>
      </div>
    </div>
  );
}
