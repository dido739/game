# Tutti Quantum - Online Board Game

A complete online implementation of the **Tutti Quantum** board game - a particle physics diagram-building game where players compete to create valid Feynman diagrams following QED (Quantum Electrodynamics) rules.

## 🎮 Game Overview

**Tutti Quantum** is a competitive card game where 2-4 players build particle physics diagrams by placing particle cards following quantum mechanics rules.

### Game Components
- **44 Elementary Particle Cards**:
  - 13 quarks (blue hexagons)
  - 8 electrons (pink/red hexagons)
  - 12 gluons (purple hexagons)
  - 7 photons (yellow diamonds)
  - 4 Higgs bosons (yellow hexagons)
- **Scoring System**: Valid vertices earn 2-6 points based on rarity
- **Loop Bonus**: Complete hexagonal loops earn +2 bonus points

## 🚀 Features

### Core Gameplay
- ✅ **User Authentication** - Register, login, JWT-based sessions
- ✅ **Local Multiplayer** - Hot-seat mode for 2-4 players
- ✅ **Online Multiplayer** - Real-time WebSocket gameplay
- ✅ **Leaderboards** - Global, ranked, and daily challenge boards
- ✅ **Multiple Game Modes** - Competitive, Cooperative, Quantum Blitz, Puzzle Campaign

### Digital-Only Features
- 🎨 **Dynamic Vertex Feedback** - Real-time validation with visual indicators
- 🎬 **Animations** - Rare process discoveries, loop completions
- 🔍 **Zoom & Pan** - Interactive board controls
- 📊 **Post-Game Analysis** - Turn replay, statistics, move suggestions
- 🎓 **Physics Education** - Learn real quantum mechanics concepts
- 🏆 **Achievements** - Unlock system with 30+ achievements

### Accessibility
- 📱 **Responsive Design** - Mobile, tablet, desktop support
- ♿ **Accessibility Features** - Colorblind mode, screen reader support
- 🌓 **Theme Toggle** - Dark/light mode

## 🛠️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **Framer Motion** for animations
- **React DnD** for drag-and-drop
- **Socket.io Client** for real-time communication

### Backend
- **Node.js 18+** with Express
- **TypeScript** for type safety
- **PostgreSQL** for persistent storage
- **Redis** for session/cache management
- **Socket.io** for WebSocket server
- **JWT** for authentication
- **Bcrypt** for password hashing

## 📁 Project Structure

```
/
├── client/          # React frontend
├── server/          # Node.js backend
├── shared/          # Shared types and constants
└── package.json     # Root workspace configuration
```

## 🏃 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL database
- Redis server

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tutti-quantum
```

2. Install dependencies:
```bash
npm run install:all
```

3. Setup environment variables:
Create `.env` files in both `client/` and `server/` directories (see `.env.example` files)

4. Initialize database:
```bash
cd server
npm run db:migrate
npm run db:seed
```

5. Start development servers:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🎯 Game Rules

### Vertex Validation
Cards must connect following QED rules:
- Arrows must flow continuously (charge conservation)
- Only certain particle combinations are valid
- 3 cards = complete vertex (can be valid or invalid)

### Valid Vertex Types
- Electron + Electron + Photon = 2 pts
- Quark + Quark + Gluon = 2 pts
- Quark + Quark + Photon = 2 pts
- Electron + Electron + Higgs = 4 pts
- Photon + Photon + Higgs = 6 pts (rarest)

### Scoring
- **Valid vertices**: 2-6 points (rarer processes = more points)
- **Invalid vertices**: -1 point
- **Valid loops**: +2 bonus points
- **Game end**: Player with most points wins

## 🧪 Testing

```bash
# Run all tests
npm test

# Run client tests
npm run test --workspace=client

# Run server tests
npm run test --workspace=server
```

## 📦 Building for Production

```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by the physical Tutti Quantum board game
- Physics rules based on Quantum Electrodynamics (QED)
- Educational content designed to teach particle physics concepts
