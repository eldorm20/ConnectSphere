import React from 'react';

const Profile: React.FC = () => {
  // Mock user data (replace with real data after auth)
  const user = {
    username: 'testuser',
    email: 'test@example.com',
    joined: 'April 24, 2025',
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{user.username}</h2>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-600"><strong>Joined:</strong> {user.joined}</p>
      </div>
    </div>
  );
};

export default Profile;
