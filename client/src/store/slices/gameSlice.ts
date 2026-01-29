import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, PlacedCard, Vertex } from 'shared';

interface GameSliceState {
  currentGame: GameState | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameSliceState = {
  currentGame: null,
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameState>) => {
      state.currentGame = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateGame: (state, action: PayloadAction<Partial<GameState>>) => {
      if (state.currentGame) {
        state.currentGame = { ...state.currentGame, ...action.payload };
      }
    },
    placeCard: (state, action: PayloadAction<PlacedCard>) => {
      if (state.currentGame) {
        state.currentGame.board.push(action.payload);
      }
    },
    addVertex: (state, action: PayloadAction<Vertex>) => {
      if (state.currentGame) {
        state.currentGame.vertices.push(action.payload);
      }
    },
    nextTurn: (state) => {
      if (state.currentGame) {
        state.currentGame.currentPlayerIndex = 
          (state.currentGame.currentPlayerIndex + 1) % state.currentGame.players.length;
        state.currentGame.turnNumber += 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearGame: (state) => {
      state.currentGame = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setGame,
  updateGame,
  placeCard,
  addVertex,
  nextTurn,
  setLoading,
  setError,
  clearGame,
} = gameSlice.actions;

export default gameSlice.reducer;
