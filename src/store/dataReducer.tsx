import { createSlice } from '@reduxjs/toolkit';

const initialState: { name: string; url: string }[] = [];

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addData: (_state, action) => [...action.payload],
        cleanData: () => [],
    },
});

export const { addData, cleanData } = dataSlice.actions;

export default dataSlice.reducer;
