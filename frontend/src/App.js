import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  // Check localStorage for a token to see if the user is already logged in
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken); // Save the token
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Home</Link>
          {/* Show Login or Logout button based on token state */}
          {token ? (
            <button onClick={handleLogout} className="nav-button">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        <header className="App-header">
          <h1>E-Commerce Store</h1>
        </header>

        <Routes>
          {/* Pass the token to the ProductList and ProductDetail components */}
          <Route path="/" element={<ProductList token={token} />} />
          <Route path="/products/:id" element={<ProductDetail token={token} />} />

          {/* Pass the login success handler to the Login component */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;