import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList({ token }) { // Receive the token as a prop
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (token) { // Only fetch if the token exists
      fetch('http://localhost:8080/api/products', {
        headers: {
          // Include the token in the Authorization header
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
    } else {
      setProducts([]); // Clear products if not logged in
    }
  }, [token]); // Re-run the effect if the token changes

  // If there's no token, show the login message
  if (!token) {
    return <p>Please log in to view products.</p>;
  }

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p>{product.description}</p>
            <p>${Number(product.price).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;