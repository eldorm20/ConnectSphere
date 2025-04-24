import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import Loading from '../components/Loading';

interface Thread {
  id: string;
  title: string;
  user_id: string;
  category_id: string;
  created_at: string;
}

const ThreadDetail: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = 'your-user-id'; // Replace with real user ID after auth

  useEffect(() => {
    fetch(`http://localhost:3000/api/threads/${threadId}`)
      .then((res) => res.json())
      .then((data) => setThread(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load thread');
      });
  }, [threadId]);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!thread) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{thread.title}</h1>
      <PostList threadId={threadId!} />
      <div className="mt-6">
        <PostForm threadId={threadId!} userId={userId} />
      </div>
    </div>
  );
};

export default ThreadDetail;
