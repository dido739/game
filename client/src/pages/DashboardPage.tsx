import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';

export default function DashboardPage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">Tutti Quantum</Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.username}!</span>
            <button className="btn-secondary text-sm">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Quick Match</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Find a random opponent and start playing immediately
            </p>
            <button className="btn-primary w-full">Find Match</button>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Create Game</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a custom game and invite your friends
            </p>
            <button className="btn-primary w-full">Create Lobby</button>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Join Game</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter a room code to join a friend's game
            </p>
            <button className="btn-primary w-full">Join Lobby</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Game Modes</h2>
            <div className="space-y-3">
              <Link to="/campaign" className="block p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                <div className="font-bold">📚 Puzzle Campaign</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Learn with 20+ levels</div>
              </Link>
              <Link to="/daily" className="block p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                <div className="font-bold">🎯 Daily Challenge</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Compete for high scores</div>
              </Link>
              <Link to="/blitz" className="block p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                <div className="font-bold">⚡ Quantum Blitz</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fast-paced timed mode</div>
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Games:</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Wins:</span>
                <span className="font-bold text-green-600">0</span>
              </div>
              <div className="flex justify-between">
                <span>Losses:</span>
                <span className="font-bold text-red-600">0</span>
              </div>
              <div className="flex justify-between">
                <span>Win Rate:</span>
                <span className="font-bold">0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
