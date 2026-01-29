import { Request, Response, NextFunction } from 'express';
import { verifyToken, getUserById } from '../services/auth';

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

/**
 * Middleware to authenticate requests using JWT
 */
export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, error: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const userId = verifyToken(token);

    // Get user
    const user = await getUserById(userId);

    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' });
      return;
    }

    // Attach user to request
    req.userId = userId;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Authentication failed' 
    });
  }
}

/**
 * Optional authentication middleware - continues even if no token
 */
export async function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const userId = verifyToken(token);
      const user = await getUserById(userId);
      
      if (user) {
        req.userId = userId;
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
}
