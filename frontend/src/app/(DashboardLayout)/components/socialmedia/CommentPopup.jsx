import React, { useState } from 'react';

const CommentPopup = ({ isVisible, onClose, onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  if (!isVisible) return null;

  const handleSubmit = () => {
    onSubmit(commentText);
    setCommentText(''); // Reset the comment text after submitting
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-blue-800 bg-opacity-25">
      <div className="bg-gray-600 p-6 rounded-md shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-500"
          rows="4"
          placeholder="Write your comment here..."
        ></textarea>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 text-white-500">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
