import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Function to register a new user
export const registerUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Function to log in a user
export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && user.validatePassword(password)) {
        return generateToken(user._id);
    }
    throw new Error('Invalid email or password');
};

// Function to generate JWT token
export const generateToken = (userId) => {
    const signOptions = { expiresIn: '1h' }; // Fix using SignOptions interface
    return jwt.sign({ id: userId }, JWT_SECRET, signOptions);
};

// Function to verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid Token');
    }
};

// Function to get a user by ID
export const getUserById = async (userId) => {
    return await User.findById(userId);
};

// Function to update user profile
export const updateUserProfile = async (userId, updates) => {
    return await User.findByIdAndUpdate(userId, updates, { new: true });
};