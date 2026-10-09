import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // For demo purposes, we'll fetch user by email
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      const user = response.data.find(u => u.email === formData.email);

      if (user) {
        // In a real app, you'd validate password with backend
        login(user);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Login</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              Login
            </button>
          </form>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          
          <div className="demo-credentials">
            <p><strong>Demo Accounts:</strong></p>
            <div style={{ marginTop: '8px', marginBottom: '8px' }}>
              <p style={{ color: '#007bff', fontWeight: 'bold' }}>👤 Customer Account:</p>
              <p>Email: <code>customer@example.com</code></p>
              <p>Password: <code>customer123</code></p>
            </div>
            <div style={{ marginTop: '10px' }}>
              <p style={{ color: '#6366f1', fontWeight: 'bold' }}>👑 Admin Account (Product Management):</p>
              <p>Email: <code>admin@ecommerce.com</code></p>
              <p>Password: <code>admin123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
