import { describe, it, expect } from 'vitest';
import { 
  createDeck, 
  validateVertex, 
  calculateScore,
  isValidPlacement 
} from '../utils/gameLogic';
import { 
  ParticleType, 
  PlacedCard, 
  Vertex,
  ParticleShape,
  ArrowDirection 
} from 'shared';

describe('Game Logic', () => {
  describe('createDeck', () => {
    it('should create a deck with 44 cards', () => {
      const deck = createDeck();
      expect(deck).toHaveLength(44);
    });

    it('should have correct particle counts', () => {
      const deck = createDeck();
      const quarks = deck.filter(c => c.type === ParticleType.QUARK);
      const electrons = deck.filter(c => c.type === ParticleType.ELECTRON);
      const gluons = deck.filter(c => c.type === ParticleType.GLUON);
      const photons = deck.filter(c => c.type === ParticleType.PHOTON);
      const higgs = deck.filter(c => c.type === ParticleType.HIGGS);

      expect(quarks).toHaveLength(13);
      expect(electrons).toHaveLength(8);
      expect(gluons).toHaveLength(12);
      expect(photons).toHaveLength(7);
      expect(higgs).toHaveLength(4);
    });
  });

  describe('validateVertex', () => {
    it('should validate electron-photon vertex (2 pts)', () => {
      const cards: PlacedCard[] = [
        {
          card: {
            id: '1',
            type: ParticleType.ELECTRON,
            shape: ParticleShape.HEXAGON,
            color: '#EC4899',
            arrowDirection: ArrowDirection.UP,
            connections: [true, true, true]
          },
          position: { x: 0, y: 0 },
          rotation: 0,
          playerId: 'player1',
          turnNumber: 1
        },
        {
          card: {
            id: '2',
            type: ParticleType.ELECTRON,
            shape: ParticleShape.HEXAGON,
            color: '#EC4899',
            arrowDirection: ArrowDirection.DOWN,
            connections: [true, true, true]
          },
          position: { x: 1, y: 0 },
          rotation: 0,
          playerId: 'player1',
          turnNumber: 2
        },
        {
          card: {
            id: '3',
            type: ParticleType.PHOTON,
            shape: ParticleShape.DIAMOND,
            color: '#F59E0B',
            arrowDirection: ArrowDirection.RIGHT,
            connections: [true, true, true]
          },
          position: { x: 0, y: 1 },
          rotation: 0,
          playerId: 'player1',
          turnNumber: 3
        }
      ];

      const vertex = validateVertex(cards);
      
      expect(vertex.isComplete).toBe(true);
      expect(vertex.isValid).toBe(true);
      expect(vertex.points).toBe(2);
    });

    it('should invalidate vertex with wrong particle count', () => {
      const cards: PlacedCard[] = [
        {
          card: {
            id: '1',
            type: ParticleType.ELECTRON,
            shape: ParticleShape.HEXAGON,
            color: '#EC4899',
            arrowDirection: ArrowDirection.UP,
            connections: [true, true, true]
          },
          position: { x: 0, y: 0 },
          rotation: 0,
          playerId: 'player1',
          turnNumber: 1
        }
      ];

      const vertex = validateVertex(cards);
      
      expect(vertex.isComplete).toBe(false);
      expect(vertex.isValid).toBe(false);
    });
  });

  describe('isValidPlacement', () => {
    it('should allow first card anywhere', () => {
      const result = isValidPlacement({ x: 0, y: 0 }, []);
      expect(result).toBe(true);
    });

    it('should require adjacent placement for subsequent cards', () => {
      const board: PlacedCard[] = [
        {
          card: {
            id: '1',
            type: ParticleType.QUARK,
            shape: ParticleShape.HEXAGON,
            color: '#3B82F6',
            arrowDirection: ArrowDirection.UP,
            connections: [true, true, true]
          },
          position: { x: 0, y: 0 },
          rotation: 0,
          playerId: 'player1',
          turnNumber: 1
        }
      ];

      // Adjacent position should be valid
      expect(isValidPlacement({ x: 1, y: 0 }, board)).toBe(true);
      expect(isValidPlacement({ x: 0, y: 1 }, board)).toBe(true);
      
      // Non-adjacent position should be invalid
      expect(isValidPlacement({ x: 5, y: 5 }, board)).toBe(false);
    });
  });
});
