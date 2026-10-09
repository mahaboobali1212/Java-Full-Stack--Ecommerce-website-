import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderHistory.css';

function OrderHistory({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/user/${user.id}`
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
      return;
    }

    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/orders/${orderId}/cancel`);
      alert(`Order #${orderId} has been cancelled successfully.`);
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
      const errMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Failed to cancel order. Please try again.';
      alert(errMsg);
    }
  };

  const handleRemoveOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to remove Order #${orderId} from your order history?`)) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/orders/${orderId}`);
      alert(`Order #${orderId} removed successfully.`);
      setOrders(prevOrders => prevOrders.filter(o => o.id !== orderId));
    } catch (error) {
      console.error('Error removing order:', error);
      const errMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Failed to remove order. Please try again.';
      alert(errMsg);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': '#ffc107',
      'CONFIRMED': '#17a2b8',
      'SHIPPED': '#007bff',
      'DELIVERED': '#28a745',
      'CANCELLED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-header-right">
                  <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                    {order.status}
                  </div>
                  {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                    <button 
                      className="btn-cancel-order"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.status === 'CANCELLED' && (
                    <button 
                      className="btn-remove-order"
                      onClick={() => handleRemoveOrder(order.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="order-items">
                {order.orderItems.map(item => (
                  <div key={item.id} className="order-item">
                    <img 
                      src={item.product?.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80'} 
                      alt={item.product?.name || 'Product'} 
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80'; }}
                    />
                    <div className="order-item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="order-item-price">${item.subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-shipping">
                  <h4>Shipping Address:</h4>
                  <p>{order.shippingAddress}</p>
                  <p>{order.shippingCity}, {order.shippingState} {order.shippingZipCode}</p>
                </div>
                <div className="order-total">
                  <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
