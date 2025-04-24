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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/threads/${threadId}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load posts');
      });
  }, [threadId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500">
              Posted on {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
