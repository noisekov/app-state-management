import { configureStore } from '@reduxjs/toolkit';
import { pageSlice } from './pageReducer';
import { dataSlice } from './dataReducer';
import { pokemonApi } from '../APISlice/ApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { searchSlice } from './searchReducer';
import { checkedPokemonSlice } from './chekedPokemons';

export const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        data: dataSlice.reducer,
        searchQuery: searchSlice.reducer,
        checkedPokemons: checkedPokemonSlice.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
