import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Ensure this matches the filename
import Home from './pages/Home';
import CategoryThreads from './pages/CategoryThreads';
import ThreadDetail from './pages/ThreadDetail';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryThreads />} />
          <Route path="/thread/:threadId" element={<ThreadDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
