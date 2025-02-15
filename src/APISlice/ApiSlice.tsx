import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
        listPosts: builder.query({
            query: (page) => `pokemon/?limit=20&offset=${page}`,
        }),
    }),
});

export const { useGetPokemonByNameQuery, useListPostsQuery } = pokemonApi;
