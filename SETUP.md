# Getting Started with Tutti Quantum

This guide will help you set up and run the Tutti Quantum game locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **PostgreSQL** database (local or cloud)
- **Redis** server (optional for full functionality)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tutti-quantum
```

### 2. Install Dependencies

Install dependencies for all workspaces:

```bash
npm install
```

This will install dependencies for the root, client, server, and shared packages.

### 3. Environment Configuration

#### Server Configuration

Create a `.env` file in the `server/` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your configuration:

```env
PORT=3000
NODE_ENV=development

# Database - Update with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/tutti_quantum?schema=public"

# Redis - Update with your Redis connection (optional)
REDIS_URL="redis://localhost:6379"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Client Configuration

Create a `.env` file in the `client/` directory:

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=http://localhost:3000
```

### 4. Database Setup

Initialize the database with Prisma:

```bash
cd server

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database with initial data
npm run db:seed
```

### 5. Build Shared Package

Build the shared types package:

```bash
cd shared
npm run build
```

## Running the Application

### Development Mode

You can run both the client and server simultaneously from the root directory:

```bash
npm run dev
```

Or run them separately:

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

### Production Build

Build all packages:

```bash
npm run build
```

Start the production server:

```bash
cd server
npm start
```

## Project Structure

```
tutti-quantum/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
├── server/              # Node.js backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Express middleware
│   │   ├── sockets/     # WebSocket handlers
│   │   └── utils/       # Utility functions
│   └── prisma/          # Database schema
├── shared/              # Shared types and constants
│   └── src/
│       └── types.ts     # TypeScript type definitions
└── package.json         # Root workspace config
```

## Testing

Run tests for all workspaces:

```bash
npm test
```

Or run tests for specific workspace:

```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test
```

## Database Management

### Prisma Studio

Open Prisma Studio to view and edit your database:

```bash
cd server
npm run db:studio
```

This will open http://localhost:5555 with a visual database editor.

### Create New Migration

After modifying `server/prisma/schema.prisma`:

```bash
cd server
npx prisma migrate dev --name description_of_change
```

### Reset Database

To reset the database (WARNING: deletes all data):

```bash
cd server
npx prisma migrate reset
```

## Troubleshooting

### Port Already in Use

If ports 3000 or 5173 are already in use, you can change them:

**Server:** Edit `PORT` in `server/.env`
**Client:** Edit `server.port` in `client/vite.config.ts`

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Verify the `DATABASE_URL` in `server/.env`
3. Check that the database exists
4. Run migrations: `npx prisma migrate dev`

### Dependency Issues

If you encounter dependency issues:

```bash
# Clean install
rm -rf node_modules client/node_modules server/node_modules shared/node_modules
rm -rf package-lock.json client/package-lock.json server/package-lock.json shared/package-lock.json
npm install
```

### Build Errors

If the shared package isn't building:

```bash
cd shared
npm run build
cd ..
```

## Next Steps

Once the application is running:

1. **Register an account** at http://localhost:5173/register
2. **Login** at http://localhost:5173/login
3. **Explore the dashboard** to create or join games
4. **Play the puzzle campaign** to learn the game mechanics
5. **Challenge friends** in online multiplayer

## Available Scripts

### Root Level
- `npm run dev` - Run both client and server in development mode
- `npm run build` - Build all packages
- `npm test` - Run all tests
- `npm run lint` - Lint all packages

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Lint code

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/your-repo/issues)
- Review the [Game Rules](README.md#game-rules)
- Read the [API Documentation](docs/API.md)

## License

MIT License - see LICENSE file for details
