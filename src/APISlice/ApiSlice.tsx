import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface PokemonResponse {
    sprites: { front_default: string };
    height: number;
    name: string;
    weight: number;
    types: { type: { name: string } }[];
}

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
            transformResponse: (response: PokemonResponse) =>
                response.name ?? '',
        }),
        listPosts: builder.query({
            query: (page) => `pokemon/?limit=20&offset=${page}`,
        }),
        getPokemonData: builder.query({
            query: (name) => `pokemon/${name}`,
            transformResponse: (response: PokemonResponse) => {
                const img = response.sprites?.front_default ?? '';
                const height = response.height ?? 0;
                const name = response.name ?? '';
                const weight = response.weight ?? 0;
                const types = response.types ?? [];
                const typesArr = types.map(({ type: { name } }) => name);

                return {
                    img,
                    height,
                    name,
                    weight,
                    types: typesArr,
                };
            },
        }),
    }),
});

export const {
    useGetPokemonByNameQuery,
    useListPostsQuery,
    useGetPokemonDataQuery,
} = pokemonApi;
