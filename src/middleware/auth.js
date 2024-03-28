const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET} = require('../config/db')
const secretKey = 'ACCESS_TOKEN_SECRET';

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = { generateToken, authenticateToken };
