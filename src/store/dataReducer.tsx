import { createSlice } from '@reduxjs/toolkit';

export interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
    isInputEmpty: boolean;
}

const initialState: requestDataI = {
    name: '',
    abilities: [],
    sprites: '',
    next: '',
    previous: '',
    url: [],
    isInputEmpty: true,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addData: (state, action) => {
            state = { ...state, ...action.payload };
        },
        cleanData: () => initialState,
    },
});

export const { addData, cleanData } = dataSlice.actions;

export default dataSlice.reducer;
