'use client'
import React, { useState } from 'react';
import Card from './Card'; // Import the Card component

const Cards = () => {
    // Initialize state with unique card data
    const [cardData, setCardData] = useState([
        {
            id: 1,
            image: 'https://picsum.photos/200/300?random=1',
            link: 'https://picsum.photos/200/300',
            likes: 1000,
            title: 'Card Title 1',
            username: 'user_1',
            desc: 'Description for car hjt by6tfn bgfthgn chgvnb fcfgbvn gb gbvd 1.'
        },
        {
            id: 2,
            image: 'https://picsum.photos/200/300?random=2',
            link: 'https://picsum.photos/200/300',
            likes: 1100,
            title: 'Card Title 2',
            username: 'user_2',
            desc: 'Description for card 2.'
        },
        {
            id: 3,
            image: 'https://picsum.photos/200/300?random=3',
            link: 'https://picsum.photos/200/300',
            likes: 1200,
            title: 'Card Title 3',
            username: 'user_3',
            desc: 'Description for card 3.'
        },
        {
            id: 4,
            image: 'https://picsum.photos/200/300?random=4',
            link: 'https://picsum.photos/200/300',
            likes: 1300,
            title: 'Card Title 4',
            username: 'user_4',
            desc: 'Description for card 4.'
        },
        {
            id: 5,
            image: 'https://picsum.photos/200/300?random=5',
            link: 'https://picsum.photos/200/300',
            likes: 1400,
            title: 'Card Title 5',
            username: 'user_5',
            desc: 'Description for card 5.'
        },
        {
            id: 6,
            image: 'https://picsum.photos/200/300?random=6',
            link: 'https://picsum.photos/200/300',
            likes: 1500,
            title: 'Card Title 6',
            username: 'user_6',
            desc: 'Description for card 6.'
        },
        {
            id: 7,
            image: 'https://picsum.photos/200/300?random=7',
            link: 'https://picsum.photos/200/300',
            likes: 1600,
            title: 'Card Title 7',
            username: 'user_7',
            desc: 'Description for card 7.'
        },
        {
            id: 8,
            image: 'https://picsum.photos/200/300?random=8',
            link: 'https://picsum.photos/200/300',
            likes: 1700,
            title: 'Card Title 8',
            username: 'user_8',
            desc: 'Description for card 8.'
        },
        {
            id: 9,
            image: 'https://picsum.photos/200/300?random=9',
            link: 'https://picsum.photos/200/300',
            likes: 1800,
            title: 'Card Title 9',
            username: 'user_9',
            desc: 'Description for card 9.'
        },
        {
            id: 10,
            image: 'https://picsum.photos/200/300?random=10',
            link: 'https://picsum.photos/200/300',
            likes: 1900,
            title: 'Card Title 10',
            username: 'user_10',
            desc: 'Description for card 10.'
        }
    ]);

    // Function to update likes for a specific card
    const updateLikes = (id) => {
        setCardData((prevData) =>
            prevData.map((card) =>
                card.id === id ? { ...card, likes: card.likes + 1 } : card
            )
        );
    };

    return (
        <div className="flex flex-wrap justify-center">
            {cardData.map((card) => (
                <Card
                    key={card.id}
                    image={card.image}
                    title={card.title}
                    link={card.link}
                    desc={card.desc}
                    likes={card.likes}
                    username={card.username}
                    onLike={() => updateLikes(card.id)} // Pass the updateLikes function to the Card component
                />
            ))}
        </div>
    );
};

export default Cards;
