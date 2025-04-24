import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading'; // Add this import

interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load categories');
      });
  }, []);

  if (categories.length === 0 && !error) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Categories</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {categories.length === 0 && !error ? (
        <p className="text-gray-500 text-center">No categories yet. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-blue-600">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
