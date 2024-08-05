import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from './firebase';
import Login from './Login';
import Register from './Register';
import Categories from './Categories';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/categories" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/categories" /> : <Register />} />
          <Route path="/categories" element={user ? <Categories user={user} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? "/categories" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
