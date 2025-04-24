import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Mock categories (we’ll fetch from backend later)
  const categories = [
    { id: '1', name: 'General', description: 'General discussions' },
    { id: '2', name: 'Tech', description: 'Technology and gadgets' },
    { id: '3', name: 'Gaming', description: 'All about games' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Categories</h1>
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
    </div>
  );
};

export default Home;
