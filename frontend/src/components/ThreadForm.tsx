import React, { useState } from 'react';

interface ThreadFormProps {
  categoryId: string;
  userId: string;
  onThreadCreated: () => void;
}

const ThreadForm: React.FC<ThreadFormProps> = ({ categoryId, userId, onThreadCreated }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, userId, categoryId }),
      });
      if (response.ok) {
        setTitle('');
        onThreadCreated(); // Trigger a refresh of the thread list
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create thread');
      }
    } catch (err) {
      setError('Network error: Failed to connect to the server');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Start a New Thread</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thread title"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Thread
        </button>
      </form>
    </div>
  );
};

export default ThreadForm;
