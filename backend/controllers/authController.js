import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export async function registerUser(req, res) {
    const { fullName, email, password, profileImageUrl } = req.body || {};

    // Simple validation
    if (!fullName || !email || !password) {
        return res
            .status(400)
            .json({ message: 'full name, email and password are required!' });
    }
    try {
        // Check if email is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: 'Email already in use!' });
        }

        // Create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message,
        });
    }
}

export async function loginUser(req, res) {}

export async function getUserInfo(req, res) {}
