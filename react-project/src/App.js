import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from './firebase';
import AuthPage from './AuthPage';
import Categories from './Categories';
import VersionHistory from './VersionHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleRestore = (commentId) => {
    if (!commentId) {
      console.error('No commentId provided');
      return;
    }
    // Restore logic here
    console.log(`Restoring comment with ID: ${commentId}`);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/categories" /> : <AuthPage />} />
          <Route path="/Register" element={user ? <Navigate to="/categories" /> : <AuthPage />} />
          <Route path="/categories" element={user ? <Categories user={user} /> : <Navigate to="/login" />} />
          <Route path="/version-history" element={<VersionHistory history={history} handleRestore={handleRestore} />} />
          <Route path="/" element={<Navigate to={user ? "/categories" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
