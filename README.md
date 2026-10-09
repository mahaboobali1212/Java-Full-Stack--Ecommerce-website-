# E-Commerce Fullstack Application

A complete fullstack e-commerce web application built with Java Spring Boot, Node.js, React, and MySQL.

## 🚀 Tech Stack

### Backend
- **Java Spring Boot** (Port 8080) - Main REST API
  - Spring Data JPA
  - Spring Security
  - MySQL Database
  - JWT Authentication
  
- **Node.js + Express** (Port 5000) - Additional Services
  - Payment Processing (Stripe)
  - Analytics API
  - MySQL Integration

### Frontend
- **React** (Port 3000)
  - React Router
  - Axios for API calls
  - Modern responsive UI

### Database
- **MySQL** - Relational database for all data storage

## 📁 Project Structure

```
ecommerce-fullstack/
├── backend-springboot/     # Java Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/ecommerce/
│   │       │   ├── model/          # Entity classes
│   │       │   ├── repository/     # Data access layer
│   │       │   ├── service/        # Business logic
│   │       │   ├── controller/     # REST endpoints
│   │       │   └── config/         # Configuration
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
├── backend-nodejs/         # Node.js Express backend
│   ├── config/            # Database configuration
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   ├── package.json
│   └── .env
│
├── frontend-react/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
│
└── database/              # Database schema and setup
    ├── schema.sql
    └── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- MySQL 8.0+
- Maven
- Git

### 1. Database Setup

1. Install and start MySQL server
2. Create the database and tables:
   ```bash
   cd database
   mysql -u root -p < schema.sql
   ```

### 2. Spring Boot Backend Setup

1. Navigate to the Spring Boot directory:
   ```bash
   cd backend-springboot
   ```

2. Update database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

3. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   
   The Spring Boot API will run on `http://localhost:8080`

### 3. Node.js Backend Setup

1. Navigate to the Node.js directory:
   ```bash
   cd backend-nodejs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `.env` file with your credentials:
   ```
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   STRIPE_SECRET_KEY=your_stripe_key (optional)
   ```

4. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```
   
   The Node.js API will run on `http://localhost:5000`

### 4. React Frontend Setup

1. Navigate to the React directory:
   ```bash
   cd frontend-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `.env` file if needed (default values should work):
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_NODE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   
   The React app will run on `http://localhost:3000`

## 🎯 Features

### Customer Features
- ✅ User registration and login
- ✅ Browse products with search and category filters
- ✅ View product details
- ✅ Add products to shopping cart
- ✅ Update cart quantities
- ✅ Checkout process
- ✅ Order history
- ✅ User profile management

### Admin Features (Backend APIs)
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ User management
- ✅ Sales analytics
- ✅ Inventory tracking

## 🔌 API Endpoints

### Spring Boot API (Port 8080)

#### Products
- `GET /api/products` - Get all active products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users/register` - Register new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

#### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/user/{userId}` - Get orders by user
- `POST /api/orders/user/{userId}` - Create new order
- `PATCH /api/orders/{id}/status` - Update order status
- `DELETE /api/orders/{id}` - Delete order

### Node.js API (Port 5000)

#### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/process` - Process payment
- `GET /api/payments/verify/{paymentIntentId}` - Verify payment

#### Analytics
- `GET /api/analytics/sales` - Get sales analytics
- `GET /api/analytics/top-products` - Get top-selling products
- `GET /api/analytics/order-stats` - Get order statistics
- `GET /api/analytics/customers` - Get customer analytics

## 🔐 Default Credentials

### Admin Account
- Email: `admin@ecommerce.com`
- Password: `admin123`

### Test Customer Account
- Email: `customer@example.com`
- Password: `customer123`

## 📊 Database Schema

- **users** - Customer and admin information
- **products** - Product catalog
- **orders** - Customer orders
- **order_items** - Individual items in orders

## 🎨 UI Features

- Responsive design for mobile and desktop
- Modern and clean interface
- Shopping cart with real-time updates
- Product search and filtering
- Order tracking
- User authentication flow

## 🚧 Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Admin dashboard
- Real-time inventory updates
- Promotional codes and discounts

## 📝 License

This project is for educational purposes.

## 👨‍💻 Development

To run all services simultaneously:

1. Terminal 1 - MySQL: Ensure MySQL is running
2. Terminal 2 - Spring Boot: `cd backend-springboot && mvn spring-boot:run`
3. Terminal 3 - Node.js: `cd backend-nodejs && npm start`
4. Terminal 4 - React: `cd frontend-react && npm start`

Visit `http://localhost:3000` to access the application.

## 🐛 Troubleshooting

### Port Already in Use
If you get port errors, ensure no other services are running on:
- 3000 (React)
- 5000 (Node.js)
- 8080 (Spring Boot)
- 3306 (MySQL)

### Database Connection Issues
- Verify MySQL is running
- Check credentials in application.properties and .env files
- Ensure the database `ecommerce_db` exists

### CORS Issues
- Ensure both backends have CORS enabled for `http://localhost:3000`
- Check the SecurityConfig in Spring Boot and cors settings in Node.js

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🚀**
