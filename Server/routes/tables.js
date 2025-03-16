const express = require('express');
const { executeQuery } = require('../models/db');
const { verifyToken, authorizeRoles } = require('../middlewares/authJWT');

const router = express.Router();

/** Get All Tables (Public) */
router.get("/tables", async (req, res) => {
    try {
        const tables = await executeQuery("SELECT * FROM tables");
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

/** Add a New Table (Waiter Only) */
router.post("/tables", verifyToken, authorizeRoles('waiter'), async (req, res) => {
    const { tableNumber, capacity, status } = req.body;
    
    try {
        await executeQuery(
            "INSERT INTO tables (tableNumber, capacity, status) VALUES (?, ?, ?)",
            [tableNumber, capacity, status || 'Available']
        );
        res.status(201).json({ message: "Table added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

/** Update Table Info (Waiter Only) */
router.put("/tables/:id", verifyToken, authorizeRoles('waiter'), async (req, res) => {
    const { capacity, status } = req.body;
    const tableId = req.params.id;

    try {
        const result = await executeQuery(
            "UPDATE tables SET capacity = ?, status = ? WHERE _id = ?",
            [capacity, status, tableId]
        );

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Table not found" });
        }

        res.json({ message: "Table updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

/** Remove a Table (Waiter Only) */
router.delete("/tables/:id", verifyToken, authorizeRoles('waiter'), async (req, res) => {
    const tableId = req.params.id;

    try {
        const result = await executeQuery("DELETE FROM tables WHERE _id = ?", [tableId]);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Table not found" });
        }

        res.json({ message: "Table removed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

module.exports = router;