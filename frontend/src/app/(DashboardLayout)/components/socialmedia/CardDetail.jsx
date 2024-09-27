'use client';
import React, { useState } from 'react';
import { IconThumbUp, IconThumbUpFilled, IconThumbDown, IconThumbDownFilled, IconMessageCircle } from '@tabler/icons-react';
import Breadcrumb from "./Breadcrumb";
import CommentPopup from './CommentPopup'; // Import the CommentPopup component

const CardDetail = () => {
  const [data, setData] = useState({
    likes: 120,
    dislikes: 20,
    description:
      "This is a detailed description of the video. Here you can add more information about the content of the video, the creator, and any other relevant details. You can also include links, timestamps, and more.",
    comments: [
      { id: 1, user: "User1", text: "This is a comment on the video." },
      { id: 2, user: "User2", text: "Another insightful comment." },
      { id: 3, user: "User3", text: "This video is great!" },
      { id: 4, user: "User4", text: "Loved the content!" },
      { id: 5, user: "User5", text: "Looking forward to more videos like this." },
    ],
  });

  const [showAllComments, setShowAllComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isCommentPopupVisible, setIsCommentPopupVisible] = useState(false); // State to control the visibility of the comment popup

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const handleLike = () => {
    if (liked) {
      setData((prevData) => ({
        ...prevData,
        likes: prevData.likes - 1,
      }));
      setLiked(false);
    } else {
      setData((prevData) => ({
        ...prevData,
        likes: prevData.likes + 1,
        dislikes: disliked ? prevData.dislikes - 1 : prevData.dislikes,
      }));
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setData((prevData) => ({
        ...prevData,
        dislikes: prevData.dislikes - 1,
      }));
      setDisliked(false);
    } else {
      setData((prevData) => ({
        ...prevData,
        dislikes: prevData.dislikes + 1,
        likes: liked ? prevData.likes - 1 : prevData.likes,
      }));
      setDisliked(true);
      setLiked(false);
    }
  };

  const handleCommentSubmit = (commentText) => {
    const newComment = {
      id: data.comments.length + 1,
      user: "Current User", // Replace with actual user data
      text: commentText,
    };

    setData((prevData) => ({
      ...prevData,
      comments: [...prevData.comments, newComment],
    }));
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Videos', href: '/videos' },
    { label: 'Video Detail' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Video Section */}
      <div className="relative w-full h-64 md:h-96 bg-black">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Video Title"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Title */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Video Title</h1>
      </div>

      {/* Likes and Comments */}
      <div className="flex items-center mt-2 space-x-4">
        <div className="flex items-center cursor-pointer" onClick={handleLike}>
          {liked ? (
            <IconThumbUpFilled className="mr-2 w-6 h-6" />
          ) : (
            <IconThumbUp className="mr-2 w-6 h-6" />
          )}
          <span>{data.likes} </span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={handleDislike}>
          {disliked ? (
            <IconThumbDownFilled className="mr-2 w-6 h-6" />
          ) : (
            <IconThumbDown className="mr-2 w-6 h-6" />
          )}
          <span>{data.dislikes} </span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => setIsCommentPopupVisible(true)}>
          <IconMessageCircle className="mr-2 w-6 h-6" />
          <span>{data.comments.length} Comments</span>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-500 mt-2">{data.description}</p>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="mt-4">
          {data.comments.slice(0, showAllComments ? data.comments.length : 3).map((comment) => (
            <div key={comment.id} className="border-b py-4">
              <p className="font-bold">{comment.user}</p>
              <p className="text-gray-500">{comment.text}</p>
            </div>
          ))}

          {data.comments.length > 3 && (
            <button onClick={toggleComments} className="text-blue-500 mt-2">
              {showAllComments ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>

      {/* Comment Popup */}
      <CommentPopup
        isVisible={isCommentPopupVisible}
        onClose={() => setIsCommentPopupVisible(false)}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default CardDetail;
