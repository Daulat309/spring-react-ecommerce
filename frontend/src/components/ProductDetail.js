import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ token }) { // Receive the token as a prop
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (token) { // Only fetch if the token exists
      fetch(`http://localhost:8080/api/products/${id}`, {
        headers: {
          // Include the token in the Authorization header
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id, token]); // Re-run if id or token changes

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!token) {
    return <div>Please log in to view product details.</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} width="400" />
      <p>{product.description}</p>
      <h3>${Number(product.price).toFixed(2)}</h3>
    </div>
  );
}

export default ProductDetail;