import { ParticleCard as ParticleCardType, ParticleType, ParticleShape } from 'shared';

interface Props {
  card: ParticleCardType;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 60,
  medium: 80,
  large: 120
};

export default function ParticleCard({ card, onClick, className = '', size = 'medium' }: Props) {
  const cardSize = sizeMap[size];
  const isHexagon = card.shape === ParticleShape.HEXAGON;
  
  // Particle type labels
  const particleLabels: Record<ParticleType, string> = {
    [ParticleType.QUARK]: 'Q',
    [ParticleType.ELECTRON]: 'e⁻',
    [ParticleType.GLUON]: 'g',
    [ParticleType.PHOTON]: 'γ',
    [ParticleType.HIGGS]: 'H'
  };

  return (
    <div
      className={`relative cursor-pointer hover:scale-110 transition-transform ${className}`}
      onClick={onClick}
      style={{ width: cardSize, height: cardSize }}
    >
      <svg width={cardSize} height={cardSize} viewBox="0 0 100 100">
        {isHexagon ? (
          // Hexagon shape
          <polygon
            points="50,5 90,30 90,70 50,95 10,70 10,30"
            fill={card.color}
            stroke="white"
            strokeWidth="2"
            className="drop-shadow-lg"
          />
        ) : (
          // Diamond shape (for photons)
          <polygon
            points="50,10 90,50 50,90 10,50"
            fill={card.color}
            stroke="white"
            strokeWidth="2"
            className="drop-shadow-lg"
          />
        )}
        
        {/* Particle label */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
          className="pointer-events-none"
        >
          {particleLabels[card.type]}
        </text>
        
        {/* Arrow indicator (simplified) */}
        <text
          x="50"
          y="75"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          className="pointer-events-none"
        >
          →
        </text>
      </svg>
    </div>
  );
}
