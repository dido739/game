import { ParticleCard as ParticleCardType } from 'shared';
import ParticleCard from './ParticleCard';

interface Props {
  cards: ParticleCardType[];
  onCardClick?: (card: ParticleCardType) => void;
  selectedCardId?: string;
}

export default function PlayerHand({ cards, onCardClick, selectedCardId }: Props) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border-2 border-gray-700">
      <h3 className="text-white font-bold mb-3">Your Hand ({cards.length} cards)</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${
              selectedCardId === card.id
                ? 'ring-4 ring-yellow-400 rounded-lg'
                : ''
            }`}
          >
            <ParticleCard
              card={card}
              onClick={() => onCardClick?.(card)}
              size="medium"
            />
          </div>
        ))}
      </div>
      {cards.length === 0 && (
        <div className="text-gray-500 text-center py-8">No cards in hand</div>
      )}
    </div>
  );
}
