import React from 'react';
import PostForm from './components/PostForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">ConnectSphere</h1>
      <PostForm threadId="sample-thread-id" userId="sample-user-id" />
    </div>
  );
};

export default App;
