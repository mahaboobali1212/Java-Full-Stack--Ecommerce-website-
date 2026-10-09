import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
      navigate('/cart');
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="empty-state"><h2>Product not found</h2></div>;
  }

  return (
    <div className="page-container">
      <div className="product-detail">
        <div className="product-detail-image">
          <img 
            src={product.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80'} 
            alt={product.name} 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80'; }}
          />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-category">{product.category} • {product.brand}</p>
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          
          <div className="product-detail-stock">
            {product.stockQuantity > 0 ? (
              <span className="in-stock">In Stock ({product.stockQuantity} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <p className="product-detail-description">{product.description}</p>

          {product.stockQuantity > 0 && (
            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.stockQuantity}
                />
                <button onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}>+</button>
              </div>

              <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
