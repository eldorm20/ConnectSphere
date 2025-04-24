import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-2 text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
