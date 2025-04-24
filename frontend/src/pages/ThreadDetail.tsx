import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const ThreadDetail: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const userId = 'your-user-id'; // Replace with real user ID after auth

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Thread Title</h1> {/* Fetch thread title later */}
      <PostList threadId={threadId!} />
      <div className="mt-6">
        <PostForm threadId={threadId!} userId={userId} />
      </div>
    </div>
  );
};

export default ThreadDetail;
