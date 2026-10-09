import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ cart, updateQuantity, removeItem }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button 
                className="cart-item-remove"
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{total > 50 ? 'FREE' : '$5.00'}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${(total * 0.1).toFixed(2)}</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>${(total + (total > 50 ? 0 : 5) + (total * 0.1)).toFixed(2)}</span>
          </div>

          <button className="btn btn-success btn-large" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          
          <Link to="/products" className="btn btn-secondary btn-large">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
