# E-Commerce Database

## Database Schema

This folder contains the MySQL database schema and initial data for the e-commerce application.

## Setup Instructions

1. Make sure MySQL is installed and running on your system
2. Open MySQL command line or workbench
3. Run the schema.sql file:

```bash
mysql -u root -p < schema.sql
```

Or in MySQL Workbench:
- Open the schema.sql file
- Execute the script

## Database Structure

### Tables:
- **users**: Customer and admin user information
- **products**: Product catalog with details and inventory
- **orders**: Customer orders with shipping information
- **order_items**: Individual items within each order

## Default Credentials

### Admin User:
- Email: admin@ecommerce.com
- Password: admin123

### Test Customer:
- Email: customer@example.com
- Password: customer123

## Database Configuration

Update the following files with your MySQL credentials:
- `backend-springboot/src/main/resources/application.properties`
- `backend-nodejs/.env`

Default configuration:
- Host: localhost
- Port: 3306
- Database: ecommerce_db
- Username: root
- Password: root
