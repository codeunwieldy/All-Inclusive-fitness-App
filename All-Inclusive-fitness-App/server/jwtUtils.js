import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Function to generate a token
export const generateToken = (user) => {
    const payload = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Function to verify token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};