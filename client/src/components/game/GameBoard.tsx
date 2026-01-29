import { PlacedCard, Vertex } from 'shared';
import ParticleCard from './ParticleCard';

interface Props {
  board: PlacedCard[];
  vertices: Vertex[];
  onCellClick?: (x: number, y: number) => void;
}

export default function GameBoard({ board, vertices, onCellClick }: Props) {
  // Calculate board boundaries
  const minX = Math.min(0, ...board.map(c => c.position.x));
  const maxX = Math.max(5, ...board.map(c => c.position.x));
  const minY = Math.min(0, ...board.map(c => c.position.y));
  const maxY = Math.max(5, ...board.map(c => c.position.y));

  // Create grid
  const gridCells = [];
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const placedCard = board.find(c => c.position.x === x && c.position.y === y);
      gridCells.push({
        x,
        y,
        placedCard
      });
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 overflow-auto">
      <h3 className="text-white font-bold mb-4 text-center">Game Board</h3>
      
      <div className="inline-grid gap-2" style={{
        gridTemplateColumns: `repeat(${maxX - minX + 1}, minmax(0, 1fr))`
      }}>
        {gridCells.map(cell => (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`
              w-24 h-24 border-2 border-dashed border-gray-700 rounded-lg
              flex items-center justify-center
              ${cell.placedCard ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'}
              transition-colors
            `}
            onClick={() => !cell.placedCard && onCellClick?.(cell.x, cell.y)}
          >
            {cell.placedCard ? (
              <ParticleCard card={cell.placedCard.card} size="medium" />
            ) : (
              <div className="text-gray-600 text-xs">
                {cell.x},{cell.y}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vertex indicators */}
      <div className="mt-6">
        <h4 className="text-white font-bold mb-2">Vertices ({vertices.length})</h4>
        <div className="flex flex-wrap gap-2">
          {vertices.map(vertex => (
            <div
              key={vertex.id}
              className={`px-3 py-1 rounded text-sm font-semibold ${
                vertex.isValid
                  ? 'bg-green-600 text-white'
                  : vertex.isComplete
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-600 text-gray-300'
              }`}
            >
              {vertex.isComplete
                ? vertex.isValid
                  ? `✓ ${vertex.points} pts`
                  : `✗ ${vertex.points} pts`
                : '⚠ Incomplete'
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
