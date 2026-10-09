import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

const DEFAULT_PREVIEW = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80';

function AddProduct({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    brand: '',
    price: '',
    stockQuantity: '50',
    imageUrl: '',
    description: '',
    active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Please fill in required fields (Name, Price).');
      return;
    }

    setLoading(true);

    try {
      const productPayload = {
        name: formData.name.trim(),
        category: formData.category,
        brand: formData.brand.trim() || 'General',
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        imageUrl: formData.imageUrl.trim() || DEFAULT_PREVIEW,
        description: formData.description.trim(),
        active: formData.active
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products`,
        productPayload
      );

      alert(`🎉 Product "${response.data.name}" added successfully!`);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      const errMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Failed to add product. Please check input and try again.';
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="page-container">
        <div className="access-denied-container">
          <div className="access-denied-card">
            <div className="access-denied-icon">🔒</div>
            <h2>Admin Access Required</h2>
            <p>Only administrators are authorized to add or modify products in the store catalog.</p>
            <div className="access-denied-actions">
              <button className="btn btn-primary" onClick={() => navigate('/login')}>
                Login as Admin
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/products')}>
                View Store Catalog
              </button>
            </div>
            <div className="admin-hint">
              <small>Demo Admin Account: <code>admin@ecommerce.com</code> / <code>admin123</code></small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="add-product-container">
        <h1 className="page-title">Add New Product</h1>
        <p className="page-subtitle">Fill in the details below to add a new item to the store catalog</p>

        <div className="add-product-layout">
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Wireless Gaming Mouse"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  type="text"
                  name="brand"
                  placeholder="e.g. Logitech, Apple, Nike"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="price"
                  placeholder="e.g. 49.99"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stockQuantity">Stock Quantity *</label>
                <input
                  id="stockQuantity"
                  type="number"
                  min="0"
                  name="stockQuantity"
                  placeholder="e.g. 100"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Product Image URL</label>
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                placeholder="https://images.unsplash.com/... or /images/yourphoto.png"
                value={formData.imageUrl}
                onChange={handleChange}
              />
              <small className="help-text">
                Paste any image web link, or leave empty to use default.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Provide a detailed description of features, specs, and benefits..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
                <span>List product as Active immediately</span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/products')}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success btn-large"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish Product'}
              </button>
            </div>
          </form>

          {/* Live Preview Card */}
          <div className="product-preview-pane">
            <h3>Live Preview</h3>
            <div className="preview-card">
              <img
                src={formData.imageUrl || DEFAULT_PREVIEW}
                alt="Product Preview"
                className="preview-image"
                onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_PREVIEW; }}
              />
              <div className="preview-info">
                <span className="preview-badge">{formData.category || 'Category'}</span>
                <h4 className="preview-title">{formData.name || 'Product Title'}</h4>
                <p className="preview-brand">{formData.brand ? `By ${formData.brand}` : 'Brand Name'}</p>
                <div className="preview-footer">
                  <span className="preview-price">
                    ${formData.price ? parseFloat(formData.price).toFixed(2) : '0.00'}
                  </span>
                  <span className="preview-stock">
                    {parseInt(formData.stockQuantity) > 0 ? `${formData.stockQuantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
