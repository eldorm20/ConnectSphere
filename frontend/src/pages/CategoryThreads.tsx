import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import ThreadForm from '../components/ThreadForm';
import Loading from '../components/Loading';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface ThreadListProps {
  categoryId: string;
  key?: number; // Add key as an optional prop since we're passing it
}

const CategoryThreads: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const userId = 'your-user-id'; // Replace with real user ID after auth

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load category');
      });
  }, [categoryId]);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!category) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <ThreadForm
        categoryId={categoryId!}
        userId={userId}
        onThreadCreated={() => setRefresh(refresh + 1)}
      />
      <ThreadList categoryId={categoryId!} key={refresh} />
    </div>
  );
};

export default CategoryThreads;
