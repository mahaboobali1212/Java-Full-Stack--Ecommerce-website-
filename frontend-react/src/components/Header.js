import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ cartCount, user, logout }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>E-Shop</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          {user && user.role === 'ADMIN' && (
            <Link to="/add-product" className="nav-link admin-nav-link">⚙️ + Add Product</Link>
          )}
          {user && <Link to="/orders" className="nav-link">My Orders</Link>}
        </nav>
        
        <div className="header-actions">
          {user ? (
            <>
              <span className="user-name">
                Hello, {user.firstName} {user.role === 'ADMIN' && <span className="admin-badge">Admin</span>}
              </span>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-success">Register</Link>
            </>
          )}
          <Link to="/cart" className="cart-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
