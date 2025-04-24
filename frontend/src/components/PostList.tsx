import React, { useEffect, useState } from 'react';

interface Post {
  id: string;
  thread_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

interface PostListProps {
  threadId: string;
}

const PostList: React.FC<PostListProps> = ({ threadId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Mock fetch for now (we’ll add this endpoint to the backend later)
    setPosts([
      { id: '1', thread_id: threadId, user_id: 'user1', content: 'First post!', created_at: new Date().toISOString() },
    ]);
  }, [threadId]);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-gray-800">{post.content}</p>
          <p className="text-sm text-gray-500">
            Posted on {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
