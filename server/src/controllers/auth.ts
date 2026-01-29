import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth';
import { LoginRequest, RegisterRequest } from 'shared';

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const data: RegisterRequest = req.body;

    // Validate input
    if (!data.username || !data.email || !data.password) {
      res.status(400).json({
        success: false,
        error: 'Username, email, and password are required'
      });
      return;
    }

    if (data.password.length < 6) {
      res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
      return;
    }

    const result = await registerUser(data);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    });
  }
}

/**
 * Log in a user
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const data: LoginRequest = req.body;

    // Validate input
    if (!data.email || !data.password) {
      res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
      return;
    }

    const result = await loginUser(data);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error instanceof Error ? error.message : 'Login failed'
    });
  }
}

/**
 * Get current user profile
 */
export async function getProfile(req: any, res: Response): Promise<void> {
  try {
    // User is already attached by authenticate middleware
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get profile'
    });
  }
}
