import React, { useState } from 'react';

interface PostFormProps {
  threadId: string;
  userId: string;
}

const PostForm: React.FC<PostFormProps> = ({ threadId, userId }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId, userId, content }),
      });
      if (response.ok) {
        setContent('');
        alert('Post created successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create post');
      }
    } catch (err) {
      setError('Network error: Failed to connect to the server');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Create a Post</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
