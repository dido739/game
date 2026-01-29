import { Player } from 'shared';

interface Props {
  players: Player[];
  currentPlayerIndex: number;
}

export default function PlayerInfo({ players, currentPlayerIndex }: Props) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border-2 border-gray-700">
      <h3 className="text-white font-bold mb-3">Players</h3>
      <div className="space-y-2">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`p-3 rounded-lg ${
              index === currentPlayerIndex
                ? 'bg-primary-600 text-white ring-2 ring-yellow-400'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">
                  {player.username}
                  {index === currentPlayerIndex && ' 👈'}
                </div>
                <div className="text-sm">
                  {player.hand.length} cards
                </div>
              </div>
              <div className="text-2xl font-bold">
                {player.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
