const express = require('express');
const { executeQuery } = require('../models/db');
const { verifyToken, authorizeRoles } = require('../middlewares/authJWT');

const router = express.Router();

/** Get All Bookings (Waiter Only) */
router.get("/bookings", verifyToken, authorizeRoles('waiter'), async (req, res) => {
    try {
        const bookings = await executeQuery("SELECT * FROM bookings");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

/** Create a New Booking (Customer Only) */
router.post("/bookings", verifyToken, authorizeRoles('customer'), async (req, res) => {
    const { tableId, date, time, remarks } = req.body;
    const userId = req.user.id; // Get from JWT token

    try {
        await executeQuery(
            "INSERT INTO bookings (userId, tableId, date, time, remarks, status) VALUES (?, ?, ?, ?, ?, 'Pending')",
            [userId, tableId, date, time, remarks]
        );
        res.status(201).json({ message: "Booking request submitted" });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

/** Update Booking Status (Waiter Only) */
router.put("/bookings/:id", verifyToken, authorizeRoles('waiter'), async (req, res) => {
    const { status } = req.body;
    const bookingId = req.params.id;

    try {
        const result = await executeQuery(
            "UPDATE bookings SET status = ? WHERE _id = ?",
            [status, bookingId]
        );

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking status updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

/** Cancel a Booking (Customer or Waiter) */
router.delete("/bookings/:id", verifyToken, async (req, res) => {
    const bookingId = req.params.id;

    try {
        // Customers can only cancel their own bookings
        let condition = "WHERE _id = ?";
        let params = [bookingId];

        if (req.user.role === 'customer') {
            condition += " AND userId = ?";
            params.push(req.user.id);
        }

        const result = await executeQuery(`DELETE FROM bookings ${condition}`, params);

        if (!result || result.affectedRows === 0) {
            return res.status(403).json({ message: "Unauthorized or booking not found" });
        }

        res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

module.exports = router;