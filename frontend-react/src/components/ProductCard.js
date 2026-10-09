import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img 
          src={product.imageUrl || DEFAULT_IMAGE} 
          alt={product.name} 
          className="product-image"
          onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE; }}
        />
      </Link>
      <div className="product-info">
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-category">{product.category}</p>
        <p className="product-brand">{product.brand}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
            disabled={product.stockQuantity === 0}
          >
            {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
