import React, { useState } from 'react';

interface PostFormProps {
  threadId: string;
  userId: string;
}

const PostForm: React.FC<PostFormProps> = ({ threadId, userId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, userId, content }),
    });
    if (response.ok) {
      setContent('');
      alert('Post created!');
    } else {
      alert('Error creating post');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <textarea
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default PostForm;
