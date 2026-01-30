import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, AuthToken, LoginRequest, RegisterRequest, AuthResponse } from 'shared';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = 10;

/**
 * Converts Prisma user to shared User type
 */
function toUser(user: {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  avatarUrl: string | null;
  title: string | null;
}): User {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    avatarUrl: user.avatarUrl ?? undefined,
    title: user.title ?? undefined
  };
}

/**
 * Registers a new user
 */
export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username }
      ]
    }
  });

  if (existingUser) {
    if (existingUser.email === data.email) {
      throw new Error('Email already registered');
    }
    if (existingUser.username === data.username) {
      throw new Error('Username already taken');
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  // Create user
  const prismaUser = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash,
      stats: {
        create: {}
      }
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      avatarUrl: true,
      title: true
    }
  });

  // Generate token
  const token = generateToken(prismaUser.id);

  return {
    user: toUser(prismaUser),
    token
  };
}

/**
 * Logs in a user
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      avatarUrl: true,
      title: true,
      passwordHash: true
    }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);

  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Remove password hash from response
  const { passwordHash, ...userWithoutPassword } = user;

  // Generate token
  const token = generateToken(user.id);

  return {
    user: toUser(userWithoutPassword),
    token
  };
}

/**
 * Generates a JWT token
 */
function generateToken(userId: string): AuthToken {
  const secret: jwt.Secret = JWT_SECRET;
  const expiresIn: string | number = JWT_EXPIRES_IN;
  
  const token = jwt.sign({ userId }, secret, { expiresIn });
  
  // Calculate expiration date
  const expiresAt = new Date();
  const expiresInStr = String(JWT_EXPIRES_IN);
  const daysMatch = expiresInStr.match(/(\\d+)d/);
  if (daysMatch) {
    expiresAt.setDate(expiresAt.getDate() + parseInt(daysMatch[1]));
  } else {
    expiresAt.setDate(expiresAt.getDate() + 7); // default 7 days
  }

  return {
    token,
    expiresAt
  };
}

/**
 * Verifies a JWT token and returns the user ID
 */
export function verifyToken(token: string): string {
  try {
    const secret: jwt.Secret = JWT_SECRET;
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Gets user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      avatarUrl: true,
      title: true
    }
  });

  return user ? toUser(user) : null;
}

/**
 * Updates user profile
 */
export async function updateUserProfile(
  userId: string,
  data: { avatarUrl?: string; title?: string }
): Promise<User> {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      avatarUrl: true,
      title: true
    }
  });

  return toUser(user);
}