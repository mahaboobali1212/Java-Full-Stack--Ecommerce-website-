const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get sales analytics
router.get('/sales', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as order_count,
                SUM(total_amount) as total_sales
            FROM orders
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get top selling products
router.get('/top-products', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                p.id,
                p.name,
                p.category,
                COUNT(oi.id) as times_ordered,
                SUM(oi.quantity) as total_quantity_sold,
                SUM(oi.subtotal) as total_revenue
            FROM products p
            INNER JOIN order_items oi ON p.id = oi.product_id
            GROUP BY p.id, p.name, p.category
            ORDER BY total_revenue DESC
            LIMIT 10
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order statistics
router.get('/order-stats', async (req, res) => {
    try {
        const [stats] = await db.query(`
            SELECT 
                COUNT(*) as total_orders,
                SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as pending_orders,
                SUM(CASE WHEN status = 'CONFIRMED' THEN 1 ELSE 0 END) as confirmed_orders,
                SUM(CASE WHEN status = 'SHIPPED' THEN 1 ELSE 0 END) as shipped_orders,
                SUM(CASE WHEN status = 'DELIVERED' THEN 1 ELSE 0 END) as delivered_orders,
                SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelled_orders,
                SUM(total_amount) as total_revenue
            FROM orders
        `);

        res.json(stats[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get customer analytics
router.get('/customers', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                u.id,
                u.email,
                u.first_name,
                u.last_name,
                COUNT(o.id) as order_count,
                SUM(o.total_amount) as total_spent
            FROM users u
            LEFT JOIN orders o ON u.id = o.user_id
            GROUP BY u.id, u.email, u.first_name, u.last_name
            ORDER BY total_spent DESC
            LIMIT 20
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
