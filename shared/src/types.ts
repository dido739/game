// ============================
// Particle Types
// ============================

export enum ParticleType {
  QUARK = 'quark',
  ELECTRON = 'electron',
  GLUON = 'gluon',
  PHOTON = 'photon',
  HIGGS = 'higgs'
}

export enum ParticleShape {
  HEXAGON = 'hexagon',
  DIAMOND = 'diamond'
}

export enum ArrowDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  UP_LEFT = 'up-left',
  UP_RIGHT = 'up-right',
  DOWN_LEFT = 'down-left',
  DOWN_RIGHT = 'down-right'
}

export interface ParticleCard {
  id: string;
  type: ParticleType;
  shape: ParticleShape;
  color: string;
  arrowDirection: ArrowDirection;
  connections: [boolean, boolean, boolean]; // 3 connection points
}

// ============================
// Game Board Types
// ============================

export interface BoardPosition {
  x: number;
  y: number;
}

export interface PlacedCard {
  card: ParticleCard;
  position: BoardPosition;
  rotation: number; // 0, 60, 120, 180, 240, 300 degrees
  playerId: string;
  turnNumber: number;
}

export interface Vertex {
  id: string;
  cards: PlacedCard[];
  position: BoardPosition;
  isComplete: boolean;
  isValid: boolean;
  points: number;
  errorMessage?: string;
  vertexType?: ValidVertexType;
}

export enum ValidVertexType {
  ELECTRON_PHOTON = 'electron-photon',
  QUARK_GLUON = 'quark-gluon',
  QUARK_PHOTON = 'quark-photon',
  ELECTRON_GLUON = 'electron-gluon',
  ELECTRON_HIGGS = 'electron-higgs',
  PHOTON_HIGGS = 'photon-higgs'
}

export interface Loop {
  id: string;
  cards: PlacedCard[];
  isValid: boolean;
  bonusPoints: number;
}

// ============================
// Player Types
// ============================

export interface Player {
  id: string;
  username: string;
  email?: string;
  hand: ParticleCard[];
  score: number;
  secretCard?: ParticleCard;
  isActive: boolean;
  turnOrder: number;
}

export interface PlayerStats {
  userId: string;
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  totalScore: number;
  averageScore: number;
  validVertices: number;
  invalidVertices: number;
  loopsCompleted: number;
  rareVertices: number;
  favoriteGameMode?: GameMode;
}

// ============================
// Game Types
// ============================

export enum GameMode {
  COMPETITIVE = 'competitive',
  COOPERATIVE = 'cooperative',
  QUANTUM_BLITZ = 'quantum-blitz',
  PUZZLE_CAMPAIGN = 'puzzle-campaign',
  DAILY_CHALLENGE = 'daily-challenge',
  PRACTICE = 'practice',
  CUSTOM = 'custom'
}

export enum GameStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned'
}

export interface GameSettings {
  mode: GameMode;
  playerCount: number;
  turnTimerSeconds?: number;
  invalidVertexPenalty: number;
  allowUndo: boolean;
  secretCardCount: number;
  expertScoringEnabled: boolean;
  loopBonus: number;
  cardDrawMode: 'random' | 'draft';
}

export interface GameState {
  id: string;
  mode: GameMode;
  status: GameStatus;
  players: Player[];
  board: PlacedCard[];
  vertices: Vertex[];
  loops: Loop[];
  currentPlayerIndex: number;
  turnNumber: number;
  deck: ParticleCard[];
  settings: GameSettings;
  createdAt: Date;
  updatedAt: Date;
  winnerId?: string;
}

// ============================
// User & Authentication Types
// ============================

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash?: string;
  createdAt: Date;
  avatarUrl?: string;
  title?: string;
}

export interface AuthToken {
  token: string;
  expiresAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: AuthToken;
}

// ============================
// Leaderboard Types
// ============================

export enum LeaderboardType {
  GLOBAL = 'global',
  RANKED = 'ranked',
  DAILY_CHALLENGE = 'daily-challenge',
  MODE_SPECIFIC = 'mode-specific'
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  rating?: number;
  gamesPlayed: number;
  wins: number;
  winRate: number;
  avatarUrl?: string;
  title?: string;
}

// ============================
// Achievement Types
// ============================

export enum AchievementType {
  FIRST_GAME = 'first-game',
  RARE_VERTEX = 'rare-vertex',
  LOOP_MASTER = 'loop-master',
  PERFECTIONIST = 'perfectionist',
  NOBEL_LAUREATE = 'nobel-laureate',
  SPEED_DEMON = 'speed-demon',
  EDUCATOR = 'educator',
  GRAND_MASTER = 'grand-master'
}

export interface Achievement {
  id: string;
  type: AchievementType;
  name: string;
  description: string;
  iconUrl: string;
  points: number;
  requirement: number;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  progress: number;
}

// ============================
// Multiplayer Types
// ============================

export enum LobbyStatus {
  WAITING = 'waiting',
  READY = 'ready',
  STARTING = 'starting',
  IN_GAME = 'in-game'
}

export interface Lobby {
  id: string;
  code: string;
  hostId: string;
  players: Player[];
  maxPlayers: number;
  settings: GameSettings;
  status: LobbyStatus;
  createdAt: Date;
}

export interface GameInvite {
  id: string;
  fromUserId: string;
  toUserId: string;
  lobbyId: string;
  createdAt: Date;
  expiresAt: Date;
}

// ============================
// Puzzle Campaign Types
// ============================

export interface PuzzleLevel {
  id: number;
  name: string;
  description: string;
  difficulty: 'tutorial' | 'intermediate' | 'advanced' | 'expert';
  requiredCards: ParticleCard[];
  goalDescription: string;
  targetScore: number;
  starThresholds: [number, number, number]; // 1-star, 2-star, 3-star scores
  physicsExplanation: string;
  hints: string[];
}

export interface PuzzleProgress {
  userId: string;
  levelId: number;
  completed: boolean;
  stars: number;
  bestScore: number;
  attempts: number;
  completedAt?: Date;
}

// ============================
// Daily Challenge Types
// ============================

export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD
  seed: number;
  startingCards: ParticleCard[];
  description: string;
  expiresAt: Date;
}

export interface DailyChallengeScore {
  userId: string;
  challengeId: string;
  score: number;
  completedAt: Date;
}

// ============================
// Socket Event Types
// ============================

export enum SocketEvent {
  // Connection
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  
  // Lobby
  CREATE_LOBBY = 'create-lobby',
  JOIN_LOBBY = 'join-lobby',
  LEAVE_LOBBY = 'leave-lobby',
  LOBBY_UPDATED = 'lobby-updated',
  START_GAME = 'start-game',
  
  // Game
  PLACE_CARD = 'place-card',
  DRAW_CARD = 'draw-card',
  END_TURN = 'end-turn',
  GAME_UPDATED = 'game-updated',
  GAME_ENDED = 'game-ended',
  
  // Chat
  SEND_MESSAGE = 'send-message',
  RECEIVE_MESSAGE = 'receive-message',
  
  // Player
  PLAYER_JOINED = 'player-joined',
  PLAYER_LEFT = 'player-left',
  PLAYER_DISCONNECTED = 'player-disconnected',
  PLAYER_RECONNECTED = 'player-reconnected',
  
  // Error
  ERROR = 'error'
}

export interface SocketMessage {
  event: SocketEvent;
  data: any;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
}

// ============================
// API Response Types
// ============================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================
// Game Logic Constants
// ============================

export const VERTEX_POINTS: Record<ValidVertexType, number> = {
  [ValidVertexType.ELECTRON_PHOTON]: 2,
  [ValidVertexType.QUARK_GLUON]: 2,
  [ValidVertexType.QUARK_PHOTON]: 2,
  [ValidVertexType.ELECTRON_GLUON]: 3,
  [ValidVertexType.ELECTRON_HIGGS]: 4,
  [ValidVertexType.PHOTON_HIGGS]: 6
};

export const PARTICLE_COUNTS: Record<ParticleType, number> = {
  [ParticleType.QUARK]: 13,
  [ParticleType.ELECTRON]: 8,
  [ParticleType.GLUON]: 12,
  [ParticleType.PHOTON]: 7,
  [ParticleType.HIGGS]: 4
};

export const PARTICLE_COLORS: Record<ParticleType, string> = {
  [ParticleType.QUARK]: '#3B82F6', // blue
  [ParticleType.ELECTRON]: '#EC4899', // pink
  [ParticleType.GLUON]: '#9333EA', // purple
  [ParticleType.PHOTON]: '#F59E0B', // yellow
  [ParticleType.HIGGS]: '#FBBF24' // yellow
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  mode: GameMode.COMPETITIVE,
  playerCount: 2,
  turnTimerSeconds: undefined,
  invalidVertexPenalty: -1,
  allowUndo: false,
  secretCardCount: 1,
  expertScoringEnabled: true,
  loopBonus: 2,
  cardDrawMode: 'random'
};
