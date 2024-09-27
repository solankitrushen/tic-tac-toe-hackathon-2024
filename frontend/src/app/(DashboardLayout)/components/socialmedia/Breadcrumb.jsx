import React from 'react';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center text-gray-600 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && <IconChevronRight className="mx-2 w-4 h-4" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-500">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
