import { verifyToken } from './jwtUtils.js';

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Attach user info to request object
    req.user = decoded;
    next();
};