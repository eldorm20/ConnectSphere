import React from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from '../components/ThreadList';

const CategoryThreads: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Category Name</h1> {/* Fetch category name later */}
      <ThreadList categoryId={categoryId!} />
    </div>
  );
};

export default CategoryThreads;
