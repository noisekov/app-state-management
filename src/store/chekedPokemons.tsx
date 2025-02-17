import { createSlice } from '@reduxjs/toolkit';

const initialState: { name: string }[] = [];

export const checkedPokemonSlice = createSlice({
    name: 'checkedPokemons',
    initialState,
    reducers: {
        addCheckedPokemon: (state, action) =>
            state.concat([{ name: action.payload }]),
        cleanCheckedPokemons: () => [],
    },
});

export const { addCheckedPokemon, cleanCheckedPokemons } =
    checkedPokemonSlice.actions;

export default checkedPokemonSlice.reducer;
