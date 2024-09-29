import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiOutlineBookmark, HiOutlineSpeakerphone } from 'react-icons/hi';
import axios from 'axios';

interface Book {
  _id: string;
  author: string;
  bookId: string;
}

const ListOfBooks = ({ onBookmarkClick, bookmarks }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/list');
        console.log('motherfucker', response.data.data.books); // Log the response to inspect
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between items-center px-4 py-2 rounded-md mb-6">
        <p className="text-gray-400 text-sm font-medium">Continue Reading</p>
        <button
          onClick={toggleShowMore}
          className="bg-gray-800 text-white rounded-md px-3 py-1 flex items-center space-x-2"
        >
          <span className="text-sm font-medium">{showMore ? 'Cancel' : 'View all'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.slice(0, 3).map((book) => (
          <Card
            key={book._id}
            icon={HiOutlineSpeakerphone}
            title={book.author}
            description={`Book ID: ${book.bookId}`}
            imageUrl="/images/backgrounds/books.jpg"
            buttonLink={`../CardsInfo/${book.bookId}`}
            onBookmarkClick={onBookmarkClick}
            isBookmarked={bookmarks?.includes(book.author)}
          />
        ))}
      </div>

      <div className={`transition-opacity duration-500 ${showMore ? 'opacity-100' : 'opacity-0'}`}>
        {showMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {books?.slice(3).map((book) => (
              <Card
                key={book._id}
                icon={HiOutlineSpeakerphone}
                title={book.author}
                description={`Book ID: ${book.bookId}`}
                imageUrl="/images/backgrounds/books.jpg"
                buttonLink={`../CardsInfo/${book.bookId}`}
                onBookmarkClick={onBookmarkClick}
                isBookmarked={bookmarks?.includes(book.author)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Card Component remains unchanged
const Card = ({
  icon: Icon,
  title,
  description,
  imageUrl,
  buttonLink,
  onBookmarkClick,
  isBookmarked,
}) => {
  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
      <Link href={buttonLink} passHref>
        <div>
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <div className="flex items-center mb-2">
              <Icon className="text-blue-500 text-xl mr-2" />
              <h3 className="text-white text-lg font-medium">{title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{description}</p>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-4 right-4">
        <HiOutlineBookmark
          className={`text-2xl cursor-pointer transition-colors ${
            isBookmarked ? 'text-yellow-400' : 'text-gray-400'
          } hover:text-white`}
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick(title);
          }}
        />
      </div>
    </div>
  );
};

export default ListOfBooks;
