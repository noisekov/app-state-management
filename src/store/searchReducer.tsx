import { createSlice } from '@reduxjs/toolkit';

const initialState: string = '';

export const searchSlice = createSlice({
    name: 'searchQuery',
    initialState,
    reducers: {
        addSearch: (_state, action) => action.payload,
        cleanSearch: () => '',
    },
});

export const { addSearch, cleanSearch } = searchSlice.actions;

export default searchSlice.reducer;
