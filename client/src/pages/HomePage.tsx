import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Tutti Quantum
          </h1>
          <p className="text-2xl text-gray-300">
            Build Feynman Diagrams. Master Particle Physics. Compete Globally.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card bg-gray-800 border border-purple-500">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">🎮 Play Now</h2>
              <p className="text-gray-300 mb-6">
                Jump into a competitive match or create a custom game with friends.
              </p>
              <div className="space-y-3">
                <Link to="/dashboard" className="btn-primary block text-center">
                  Enter Dashboard
                </Link>
                <Link to="/register" className="btn-secondary block text-center">
                  Create Account
                </Link>
              </div>
            </div>

            <div className="card bg-gray-800 border border-blue-500">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">📚 Learn Physics</h2>
              <p className="text-gray-300 mb-6">
                Master quantum mechanics through 20+ puzzle campaign levels.
              </p>
              <Link to="/campaign" className="btn-secondary block text-center">
                Start Campaign
              </Link>
            </div>
          </div>

          <div className="card bg-gray-800 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">✨ Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🌐</div>
                <h3 className="font-bold mb-2">Online Multiplayer</h3>
                <p className="text-gray-400 text-sm">
                  Real-time WebSocket gameplay with 2-4 players
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="font-bold mb-2">Leaderboards</h3>
                <p className="text-gray-400 text-sm">
                  Compete globally with ranked ELO system
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-bold mb-2">Daily Challenges</h3>
                <p className="text-gray-400 text-sm">
                  New puzzle every 24 hours with rewards
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-400">
            <h2 className="text-3xl font-bold mb-4 text-center">How to Play</h2>
            <ol className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="font-bold text-purple-400 mr-3">1.</span>
                <span>Place particle cards adjacent to existing cards to form vertices</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-purple-400 mr-3">2.</span>
                <span>Follow QED rules: arrows must flow continuously (charge conservation)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-purple-400 mr-3">3.</span>
                <span>Valid vertices earn 2-6 points based on rarity (Higgs = 6 pts!)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-purple-400 mr-3">4.</span>
                <span>Complete hexagonal loops for +2 bonus points</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-purple-400 mr-3">5.</span>
                <span>Highest score when all cards are played wins!</span>
              </li>
            </ol>
          </div>
        </div>

        <footer className="text-center mt-16 text-gray-500">
          <p>© 2024 Tutti Quantum | Educational Particle Physics Game</p>
        </footer>
      </div>
    </div>
  );
}
