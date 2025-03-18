const jwt = require('jsonwebtoken')
require('dotenv').config()

// Generate JWT token
function generateToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn:'1h' }
    )
}

// Verify token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // get token, which is after Bearer
    if (!token) res.status(401).json({ message: 'Access denied. No token provided. '})
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded;  // parse JWT and store into req.user
        next()
    })
}

module.exports = { generateToken, verifyToken };