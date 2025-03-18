const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { executeQuery } = require('../models/db'); 

// Get bookings
router.get("/my-bookings", async (req, res) => {
    const { email } = req.query; // Get email from query parameters

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const query = "SELECT _id, date, time, guests, comments FROM bookings WHERE email = ?";
        const results = await executeQuery(query, [email]);

        if (results.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.json({ bookings: results });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
  
// Get booked slots
router.get('/booked-slots', async (req, res) => {
    const { date } = req.query;

    try {
        const results = await executeQuery(
            `SELECT time FROM bookings WHERE date = ?`, [date]
        );

        const bookedTimes = results.map(row => row.time);

        res.json({ bookedTimes });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new booking
router.post('/book-table', async (req, res) => {
    const { email, date, time, guests, comments } = req.body;

    if (!email || !date || !time || !guests) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await executeQuery(
            `INSERT INTO bookings (email, date, time, guests, comments) VALUES (?, ?, ?, ?, ?)`,
            [email, date, time, guests, comments]
        );

        res.json({ 
            message: "Booking confirmed", 
            bookingId: result.insertId, 
            date: date, 
            time: time 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update booking info
router.put("/update-booking/:id", async (req, res) => {
    const { id } = req.params; // Get bookingId from URL
    const { guests, comments } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Missing booking ID" });
    }

    try {
        const sql = `UPDATE bookings SET guests=?, comments=? WHERE _id=?`;
        await executeQuery(sql, [guests, comments, id]);

        res.json({ success: true, message: "Booking updated successfully" });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// Delete booking
router.delete("/delete-booking/:id", async (req, res) => {
    const { id } = req.params;
    await executeQuery("DELETE FROM bookings WHERE _id=?", [id]);
    res.json({ success: true });
});

module.exports = router;