import {
  ParticleCard,
  ParticleType,
  ParticleShape,
  ArrowDirection,
  PlacedCard,
  Vertex,
  ValidVertexType,
  VERTEX_POINTS,
  PARTICLE_COUNTS,
  PARTICLE_COLORS,
  Loop
} from 'shared';
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a full deck of particle cards
 */
export function createDeck(): ParticleCard[] {
  const deck: ParticleCard[] = [];
  
  // Create quarks (blue hexagons)
  for (let i = 0; i < PARTICLE_COUNTS[ParticleType.QUARK]; i++) {
    deck.push({
      id: uuidv4(),
      type: ParticleType.QUARK,
      shape: ParticleShape.HEXAGON,
      color: PARTICLE_COLORS[ParticleType.QUARK],
      arrowDirection: getRandomArrowDirection(),
      connections: [true, true, true]
    });
  }
  
  // Create electrons (pink hexagons)
  for (let i = 0; i < PARTICLE_COUNTS[ParticleType.ELECTRON]; i++) {
    deck.push({
      id: uuidv4(),
      type: ParticleType.ELECTRON,
      shape: ParticleShape.HEXAGON,
      color: PARTICLE_COLORS[ParticleType.ELECTRON],
      arrowDirection: getRandomArrowDirection(),
      connections: [true, true, true]
    });
  }
  
  // Create gluons (purple hexagons)
  for (let i = 0; i < PARTICLE_COUNTS[ParticleType.GLUON]; i++) {
    deck.push({
      id: uuidv4(),
      type: ParticleType.GLUON,
      shape: ParticleShape.HEXAGON,
      color: PARTICLE_COLORS[ParticleType.GLUON],
      arrowDirection: getRandomArrowDirection(),
      connections: [true, true, true]
    });
  }
  
  // Create photons (yellow diamonds)
  for (let i = 0; i < PARTICLE_COUNTS[ParticleType.PHOTON]; i++) {
    deck.push({
      id: uuidv4(),
      type: ParticleType.PHOTON,
      shape: ParticleShape.DIAMOND,
      color: PARTICLE_COLORS[ParticleType.PHOTON],
      arrowDirection: getRandomArrowDirection(),
      connections: [true, true, true]
    });
  }
  
  // Create Higgs bosons (yellow hexagons)
  for (let i = 0; i < PARTICLE_COUNTS[ParticleType.HIGGS]; i++) {
    deck.push({
      id: uuidv4(),
      type: ParticleType.HIGGS,
      shape: ParticleShape.HEXAGON,
      color: PARTICLE_COLORS[ParticleType.HIGGS],
      arrowDirection: getRandomArrowDirection(),
      connections: [true, true, true]
    });
  }
  
  return shuffleDeck(deck);
}

/**
 * Shuffles a deck of cards
 */
export function shuffleDeck(deck: ParticleCard[]): ParticleCard[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets a random arrow direction
 */
function getRandomArrowDirection(): ArrowDirection {
  const directions = Object.values(ArrowDirection);
  return directions[Math.floor(Math.random() * directions.length)];
}

/**
 * Validates a vertex formed by 3 cards
 */
export function validateVertex(cards: PlacedCard[]): Vertex {
  if (cards.length !== 3) {
    return {
      id: uuidv4(),
      cards,
      position: cards[0]?.position || { x: 0, y: 0 },
      isComplete: false,
      isValid: false,
      points: 0,
      errorMessage: 'Vertex must have exactly 3 cards'
    };
  }

  // Extract particle types
  const types = cards.map(c => c.card.type);
  const sortedTypes = [...types].sort();

  // Check for valid combinations
  let vertexType: ValidVertexType | undefined;
  let points = 0;

  // Electron + Electron + Photon = 2 pts
  if (countParticles(types, ParticleType.ELECTRON) === 2 && 
      countParticles(types, ParticleType.PHOTON) === 1) {
    vertexType = ValidVertexType.ELECTRON_PHOTON;
    points = VERTEX_POINTS[vertexType];
  }
  // Quark + Quark + Gluon = 2 pts
  else if (countParticles(types, ParticleType.QUARK) === 2 && 
           countParticles(types, ParticleType.GLUON) === 1) {
    vertexType = ValidVertexType.QUARK_GLUON;
    points = VERTEX_POINTS[vertexType];
  }
  // Quark + Quark + Photon = 2 pts
  else if (countParticles(types, ParticleType.QUARK) === 2 && 
           countParticles(types, ParticleType.PHOTON) === 1) {
    vertexType = ValidVertexType.QUARK_PHOTON;
    points = VERTEX_POINTS[vertexType];
  }
  // Electron + Electron + Gluon = 3 pts
  else if (countParticles(types, ParticleType.ELECTRON) === 2 && 
           countParticles(types, ParticleType.GLUON) === 1) {
    vertexType = ValidVertexType.ELECTRON_GLUON;
    points = VERTEX_POINTS[vertexType];
  }
  // Electron + Electron + Higgs = 4 pts
  else if (countParticles(types, ParticleType.ELECTRON) === 2 && 
           countParticles(types, ParticleType.HIGGS) === 1) {
    vertexType = ValidVertexType.ELECTRON_HIGGS;
    points = VERTEX_POINTS[vertexType];
  }
  // Photon + Photon + Higgs = 6 pts (rarest)
  else if (countParticles(types, ParticleType.PHOTON) === 2 && 
           countParticles(types, ParticleType.HIGGS) === 1) {
    vertexType = ValidVertexType.PHOTON_HIGGS;
    points = VERTEX_POINTS[vertexType];
  }

  // Check arrow flow continuity (simplified - would need more complex logic for real physics)
  const arrowFlowValid = checkArrowFlow(cards);

  const isValid = !!vertexType && arrowFlowValid;

  return {
    id: uuidv4(),
    cards,
    position: cards[0].position,
    isComplete: true,
    isValid,
    points: isValid ? points : -1, // Invalid vertex penalty
    vertexType,
    errorMessage: !vertexType 
      ? 'Invalid particle combination - forbidden in nature'
      : !arrowFlowValid 
        ? 'Arrow flow breaks charge conservation'
        : undefined
  };
}

/**
 * Counts how many particles of a given type are in the array
 */
function countParticles(types: ParticleType[], targetType: ParticleType): number {
  return types.filter(t => t === targetType).length;
}

/**
 * Checks if arrow flow is continuous (simplified version)
 * In a real implementation, this would check actual arrow directions
 */
function checkArrowFlow(cards: PlacedCard[]): boolean {
  // Simplified: assume arrow flow is valid for now
  // Real implementation would check:
  // 1. Arrows must flow in/out continuously
  // 2. Charge must be conserved
  // 3. Direction must match particle type rules
  return true;
}

/**
 * Detects valid loops in the board
 * A loop is 6 cards forming a closed hexagon
 */
export function detectLoops(board: PlacedCard[]): Loop[] {
  const loops: Loop[] = [];
  
  // Simplified loop detection
  // Real implementation would:
  // 1. Find hexagonal patterns of 6 cards
  // 2. Verify they form a closed loop
  // 3. Check if the loop follows QED rules
  
  // For now, return empty array
  // This would be implemented with graph traversal algorithms
  
  return loops;
}

/**
 * Calculates the total score for a player
 */
export function calculateScore(
  vertices: Vertex[],
  loops: Loop[],
  settings: { invalidVertexPenalty: number; loopBonus: number }
): number {
  let score = 0;
  
  // Add points from vertices
  for (const vertex of vertices) {
    if (vertex.isComplete) {
      if (vertex.isValid) {
        score += vertex.points;
      } else {
        score += settings.invalidVertexPenalty;
      }
    }
  }
  
  // Add bonus points from loops
  for (const loop of loops) {
    if (loop.isValid) {
      score += settings.loopBonus;
    }
  }
  
  return score;
}

/**
 * Deals initial cards to players
 */
export function dealCards(
  deck: ParticleCard[],
  playerCount: number,
  handSize: number = 7
): { hands: ParticleCard[][]; remainingDeck: ParticleCard[] } {
  const hands: ParticleCard[][] = Array(playerCount).fill(null).map(() => []);
  let currentIndex = 0;
  
  // Deal cards round-robin
  for (let i = 0; i < handSize; i++) {
    for (let p = 0; p < playerCount; p++) {
      if (currentIndex < deck.length) {
        hands[p].push(deck[currentIndex]);
        currentIndex++;
      }
    }
  }
  
  return {
    hands,
    remainingDeck: deck.slice(currentIndex)
  };
}

/**
 * Checks if a card placement is valid (adjacent to existing cards)
 */
export function isValidPlacement(
  position: { x: number; y: number },
  board: PlacedCard[]
): boolean {
  // First card can be placed anywhere
  if (board.length === 0) {
    return true;
  }
  
  // Check if adjacent to at least one existing card
  // Hexagonal grid adjacency check
  const adjacentPositions = getAdjacentPositions(position);
  
  return board.some(placedCard => 
    adjacentPositions.some(adj => 
      adj.x === placedCard.position.x && adj.y === placedCard.position.y
    )
  );
}

/**
 * Gets adjacent positions in a hexagonal grid
 */
function getAdjacentPositions(position: { x: number; y: number }): { x: number; y: number }[] {
  const { x, y } = position;
  
  // Hexagonal grid has 6 neighbors
  return [
    { x: x + 1, y: y },
    { x: x - 1, y: y },
    { x: x, y: y + 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y + 1 }
  ];
}
