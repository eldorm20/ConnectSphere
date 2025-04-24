import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Thread {
  id: string;
  title: string;
  user_id: string;
  category_id: string;
  created_at: string;
}

interface ThreadListProps {
  categoryId: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ categoryId }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories/${categoryId}/threads`)
      .then((res) => res.json())
      .then((data) => setThreads(data))
      .catch((err) => console.error(err));
  }, [categoryId]);

  return (
    <div className="space-y-4">
      {threads.length === 0 ? (
        <p className="text-gray-500">No threads yet. Be the first to start one!</p>
      ) : (
        threads.map((thread) => (
          <Link
            to={`/thread/${thread.id}`}
            key={thread.id}
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-blue-600">{thread.title}</h3>
            <p className="text-sm text-gray-500">
              Posted on {new Date(thread.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default ThreadList;
