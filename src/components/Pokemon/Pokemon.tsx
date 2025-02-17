import './Pokemon.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { useGetPokemonByNameQuery } from '../../APISlice/ApiSlice';
import Loader from '../Loader/Loader';
import {
    addCheckedPokemon,
    removeCheckedPokemon,
} from '../../store/chekedPokemons';

export default function Pokemon() {
    const storeData = useSelector((state: RootState) => state.data);
    const search = useSelector((state: RootState) => state.searchQuery);
    const [searchQuery, setSerchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setSerchQuery(search);
    }, [search]);

    const { data, isError, isFetching } = useGetPokemonByNameQuery(searchQuery);
    const { name: foundedPokemonFromSearch } = { ...data };

    const checkedPokemons = useSelector(
        (state: RootState) => state.checkedPokemons
    );

    const saveChekedCard = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const pokemonName = event.target.labels?.[0].innerText;
        const isPokemonChecked = event.target.checked;

        if (isPokemonChecked) {
            dispatch(addCheckedPokemon(pokemonName));

            return;
        }

        dispatch(removeCheckedPokemon(pokemonName));
    };

    return (
        <div className="pokemon">
            {isFetching ? (
                <Loader />
            ) : isError ? (
                <>Incorrect Input Value</>
            ) : foundedPokemonFromSearch ? (
                <div className="pokemon-cards">
                    <div className="pokemon-card">
                        {foundedPokemonFromSearch}
                    </div>
                </div>
            ) : (
                <div className="pokemon-cards grid">
                    {storeData.map((pokemon) => (
                        <label className="pokemon-card" key={pokemon.name}>
                            {pokemon.name}
                            <input
                                className="pokemon-input"
                                type="checkbox"
                                onChange={(event) => saveChekedCard(event)}
                                checked={checkedPokemons.some(
                                    (item) => item.name === pokemon.name
                                )}
                            />
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
