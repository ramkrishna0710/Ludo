import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState';

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        resetGame: () => initialState,
        announceWinner: (state, action) => {
            state.winner = action.payload;
        },
        updateFireworks: (state, action) => {
            state.fireworks = action.payload;
        }
    }
})

export const { resetGame, announceWinner, updateFireworks } = gameSlice.actions

export default gameSlice.reducer;