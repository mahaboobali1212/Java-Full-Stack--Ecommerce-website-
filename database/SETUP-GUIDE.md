# MySQL Database Setup and Deployment Guide

## Prerequisites

Before setting up the database, ensure you have:
- MySQL Server 8.0+ installed
- MySQL Command Line Client or MySQL Workbench
- Administrator/root access to MySQL

## Installation of MySQL (if not already installed)

### Windows:
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run the installer and select "MySQL Server"
3. During setup, set a root password (remember this!)
4. Complete the installation and start MySQL service

### Verify MySQL Installation:
```powershell
mysql --version
```

## Database Setup Methods

### Method 1: Using MySQL Command Line (Recommended)

#### Step 1: Start MySQL Service
```powershell
# Check if MySQL service is running
Get-Service MySQL*

# Start MySQL service if not running
net start MySQL80
```

#### Step 2: Connect to MySQL
```powershell
# Navigate to the database folder
cd "C:\Users\91701\Documents\Code\Java FullStack\ecommerce-fullstack\database"

# Connect to MySQL as root
mysql -u root -p
```
Enter your MySQL root password when prompted.

#### Step 3: Run the Schema File
Once connected to MySQL, run:
```sql
source schema.sql;
-- OR --
\. schema.sql
```

Alternatively, run it directly from PowerShell:
```powershell
mysql -u root -p < schema.sql
```

#### Step 4: Verify Database Creation
```powershell
# Connect to MySQL
mysql -u root -p

# Then run these SQL commands:
```sql
SHOW DATABASES;
USE ecommerce_db;
SHOW TABLES;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM users;
```

You should see:
- Database: `ecommerce_db`
- Tables: `users`, `products`, `orders`, `order_items`
- 15 products and 2 users

---

### Method 2: Using MySQL Workbench (GUI)

#### Step 1: Open MySQL Workbench
- Launch MySQL Workbench
- Click on your local MySQL connection

#### Step 2: Execute Schema File
1. Go to **File → Open SQL Script**
2. Navigate to `database/schema.sql`
3. Click **Open**
4. Click the lightning bolt icon (⚡) to execute all
5. Check the output panel for success messages

#### Step 3: Verify
1. Refresh the **SCHEMAS** panel (right-click → Refresh All)
2. Expand `ecommerce_db`
3. You should see all 4 tables

---

## Creating a Dedicated Database User (Recommended for Production)

Instead of using root, create a dedicated user:

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create a new user
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant privileges on the ecommerce database
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Verify
SHOW GRANTS FOR 'ecommerce_user'@'localhost';

-- Exit
exit;
```

#### Update Application Configuration

After creating the dedicated user, update these files:

**backend-springboot/src/main/resources/application.properties:**
```properties
spring.datasource.username=ecommerce_user
spring.datasource.password=your_secure_password
```

**backend-nodejs/.env:**
```env
DB_USER=ecommerce_user
DB_PASSWORD=your_secure_password
```

---

## Database Management Commands

### Start/Stop MySQL Service (Windows)
```powershell
# Start MySQL
net start MySQL80

# Stop MySQL
net stop MySQL80

# Restart MySQL
net stop MySQL80 && net start MySQL80
```

### Common MySQL Commands
```sql
-- Show all databases
SHOW DATABASES;

-- Select database
USE ecommerce_db;

-- Show all tables
SHOW TABLES;

-- View table structure
DESCRIBE products;
DESCRIBE users;
DESCRIBE orders;
DESCRIBE order_items;

-- View data
SELECT * FROM products;
SELECT * FROM users;
SELECT * FROM orders;

-- Count records
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM users;
```

---

## Backup and Restore

### Create Backup
```powershell
# Backup entire database
mysqldump -u root -p ecommerce_db > backup_ecommerce_db.sql

# Backup with timestamp
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
mysqldump -u root -p ecommerce_db > "backup_ecommerce_db_$timestamp.sql"
```

### Restore from Backup
```powershell
# Restore database
mysql -u root -p ecommerce_db < backup_ecommerce_db.sql
```

---

## Troubleshooting

### Issue: "Access denied for user 'root'@'localhost'"
**Solution:**
- Verify your password is correct
- Reset root password if forgotten
- Check MySQL service is running

### Issue: "Unknown database 'ecommerce_db'"
**Solution:**
```sql
-- Manually create the database
CREATE DATABASE ecommerce_db;
USE ecommerce_db;
source schema.sql;
```

### Issue: "Table already exists"
**Solution:**
- The schema.sql file drops and recreates the database
- If you want to preserve data, comment out the DROP DATABASE line in schema.sql

### Issue: Port 3306 already in use
**Solution:**
```powershell
# Check what's using port 3306
netstat -ano | findstr :3306

# Stop the process or change MySQL port in my.ini
```

### Issue: Can't connect from application
**Solution:**
1. Verify MySQL is running: `Get-Service MySQL*`
2. Check firewall settings
3. Verify credentials in application.properties and .env files
4. Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

---

## Database Schema Overview

```
ecommerce_db/
├── users              (Customer and admin accounts)
│   ├── id (PK)
│   ├── email (UNIQUE)
│   ├── password (hashed)
│   ├── firstName, lastName
│   ├── phone, address, city, state, zipCode
│   └── role (CUSTOMER/ADMIN)
│
├── products           (Product catalog)
│   ├── id (PK)
│   ├── name, description
│   ├── price, stockQuantity
│   ├── category, brand
│   └── imageUrl, active
│
├── orders            (Customer orders)
│   ├── id (PK)
│   ├── user_id (FK → users)
│   ├── totalAmount
│   ├── status (PENDING/CONFIRMED/SHIPPED/DELIVERED/CANCELLED)
│   └── shipping details
│
└── order_items       (Items in each order)
    ├── id (PK)
    ├── order_id (FK → orders)
    ├── product_id (FK → products)
    ├── quantity, price
    └── subtotal
```

---

## Production Deployment Checklist

- [ ] Create dedicated database user (not root)
- [ ] Use strong passwords
- [ ] Enable MySQL binary logging for backups
- [ ] Set up automated backups
- [ ] Configure MySQL for production (my.ini/my.cnf)
- [ ] Enable SSL connections
- [ ] Set up monitoring and alerts
- [ ] Document credentials securely
- [ ] Test backup and restore procedures
- [ ] Configure firewall rules
- [ ] Update application connection strings

---

## Quick Start Script

Save this as `setup-database.bat` in the database folder:

```batch
@echo off
echo ========================================
echo E-Commerce Database Setup
echo ========================================
echo.
echo Checking MySQL service...
net start MySQL80 2>nul
if %errorlevel% neq 0 (
    echo MySQL service is already running or failed to start
)
echo.
echo Setting up database...
mysql -u root -p < schema.sql
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Database setup completed successfully!
    echo ========================================
    echo.
    echo Database: ecommerce_db
    echo Tables: users, products, orders, order_items
    echo.
    echo Test Accounts:
    echo - Admin: admin@ecommerce.com / admin123
    echo - Customer: customer@example.com / customer123
    echo.
) else (
    echo.
    echo ========================================
    echo Database setup failed!
    echo ========================================
    echo Please check your MySQL credentials and try again.
)
pause
```

Run it with:
```powershell
.\setup-database.bat
```

---

## Next Steps

After database setup:
1. ✅ Database is ready
2. Start Spring Boot backend (Port 8080)
3. Start Node.js backend (Port 5000)
4. Start React frontend (Port 3000)

Your e-commerce application is now ready to use! 🚀
