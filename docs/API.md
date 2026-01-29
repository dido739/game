# Tutti Quantum API Documentation

## Base URL

Development: `http://localhost:3000/api`  
Production: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication

#### Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": { "id": "string", "username": "string", "email": "string" },
    "token": { "token": "string", "expiresAt": "datetime" }
  }
}
```

#### Login
**Endpoint:** `POST /api/auth/login`

#### Get Profile
**Endpoint:** `GET /api/auth/profile` (Requires authentication)

## WebSocket Events

Connect with Socket.io and JWT token in auth.

**Events:** create-lobby, join-lobby, place-card, send-message

See full documentation for details.
