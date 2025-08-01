import React, { useState, useEffect } from 'react';

function ProductForm({ onProductAddedOrUpdated, editingProduct }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // This effect runs when the 'editingProduct' prop changes
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setImageUrl(editingProduct.imageUrl);
      setIsEditing(true);
    } else {
      // If not editing, clear the form
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setIsEditing(false);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = { name, description, price, imageUrl };

    const url = isEditing
      ? `http://localhost:8080/api/products/${editingProduct.id}`
      : 'http://localhost:8080/api/products';

    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then(response => response.json())
      .then(() => {
        onProductAddedOrUpdated();
      })
      .catch(error => console.error('Error saving product:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{isEditing ? 'Edit Product' : 'Add a New Product'}</h3>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
}

export default ProductForm;