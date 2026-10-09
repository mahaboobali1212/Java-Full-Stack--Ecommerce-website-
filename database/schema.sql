-- E-Commerce Database Schema
-- Drop database if exists and create fresh
DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products table
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(100),
    image_url VARCHAR(500),
    brand VARCHAR(100),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    INDEX idx_category (category),
    INDEX idx_active (active),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Orders table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    shipping_address VARCHAR(255),
    shipping_city VARCHAR(100),
    shipping_state VARCHAR(100),
    shipping_zip_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Order Items table
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data for testing
-- Sample admin user (password: admin123)
INSERT INTO users (email, password, first_name, last_name, role) 
VALUES ('admin@ecommerce.com', '$2a$10$rO/zMlmkEqYQjLfLhlYXPeKvJF8K8W8zvY5dP4hJ4qxJGqNvN5fWu', 'Admin', 'User', 'ADMIN');

-- Sample customer (password: customer123)
INSERT INTO users (email, password, first_name, last_name, phone, address, city, state, zip_code) 
VALUES ('customer@example.com', '$2a$10$rO/zMlmkEqYQjLfLhlYXPeKvJF8K8W8zvY5dP4hJ4qxJGqNvN5fWu', 'John', 'Doe', '555-0123', '123 Main St', 'New York', 'NY', '10001');

-- Sample products
INSERT INTO products (name, description, price, stock_quantity, category, brand, image_url) VALUES
('Laptop Pro 15', 'High-performance laptop with 15-inch display, 16GB RAM, 512GB SSD', 1299.99, 50, 'Electronics', 'TechBrand', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80'),
('Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 29.99, 200, 'Electronics', 'TechBrand', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=80'),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches', 89.99, 100, 'Electronics', 'TechBrand', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80'),
('Smartphone X', 'Latest smartphone with 6.5-inch OLED display, 128GB storage', 899.99, 75, 'Electronics', 'PhoneCorp', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80'),
('Wireless Headphones', 'Noise-canceling wireless headphones with 30-hour battery', 249.99, 120, 'Electronics', 'AudioTech', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'),
('Smartwatch Pro', 'Fitness tracking smartwatch with heart rate monitor', 349.99, 80, 'Electronics', 'WearableTech', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80'),
('4K Monitor 27"', 'Ultra HD 4K monitor with HDR support', 449.99, 60, 'Electronics', 'TechBrand', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader', 39.99, 150, 'Electronics', 'TechBrand', 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&auto=format&fit=crop&q=80'),
('External SSD 1TB', 'Portable external SSD with 1TB storage capacity', 129.99, 90, 'Electronics', 'StoragePro', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=80'),
('Webcam HD', '1080p HD webcam with built-in microphone', 79.99, 110, 'Electronics', 'TechBrand', '/images/webcam.png'),
('Gaming Chair', 'Ergonomic gaming chair with lumbar support', 299.99, 40, 'Furniture', 'GameFurniture', 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop&q=80'),
('Desk Lamp LED', 'Adjustable LED desk lamp with touch control', 45.99, 130, 'Furniture', 'LightingCo', 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500&auto=format&fit=crop&q=80'),
('Backpack Pro', 'Professional laptop backpack with multiple compartments', 69.99, 100, 'Accessories', 'BagBrand', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80'),
('Power Bank 20000mAh', 'High-capacity power bank with fast charging', 49.99, 180, 'Electronics', 'PowerTech', '/images/powerbank.png'),
('Bluetooth Speaker', 'Portable Bluetooth speaker with 360-degree sound', 89.99, 95, 'Electronics', 'AudioTech', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80');

-- Sample order
INSERT INTO orders (user_id, total_amount, status, shipping_address, shipping_city, shipping_state, shipping_zip_code)
VALUES (2, 1419.97, 'DELIVERED', '123 Main St', 'New York', 'NY', '10001');

-- Sample order items
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(1, 1, 1, 1299.99, 1299.99),
(1, 2, 2, 29.99, 59.98),
(1, 3, 1, 89.99, 89.99);
