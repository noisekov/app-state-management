import { createSlice } from '@reduxjs/toolkit';

export interface Page {
    value: number;
}

const initialState: Page = {
    value: 1,
};

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 1;
        },
        set: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { increment, decrement, reset, set } = pageSlice.actions;

export default pageSlice.reducer;
