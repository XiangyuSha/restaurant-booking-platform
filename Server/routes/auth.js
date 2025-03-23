const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../models/db');
const { generateToken } = require('../middlewares/authJWT');

const router = express.Router();

// Register (No Roles)
router.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUsers = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const defaultName = "User_" + Math.floor(Math.random() * 10000);

        await executeQuery(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [defaultName, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (err) {
        console.error("Error in register:", err);
        res.status(500).json({ error: err.message });
    }
});

// Login (No Roles)
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const users = await executeQuery('SELECT _id, email, password FROM users WHERE email = ?', [email]);

        if (!users.length) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT without role
        const tokenJWT = generateToken({ id: user.id, email });

        res.json({
            message: "Login successful!",
            token: tokenJWT
        });

    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;