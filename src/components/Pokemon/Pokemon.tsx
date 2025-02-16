import './Pokemon.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { useGetPokemonByNameQuery } from '../../APISlice/ApiSlice';
import Loader from '../Loader/Loader';

export default function Pokemon() {
    const storeData = useSelector((state: RootState) => state.data);
    const search = useSelector((state: RootState) => state.searchQuery);
    const [searchQuery, setSerchQuery] = useState('');

    useEffect(() => {
        setSerchQuery(search);
    }, [search]);

    const { data, isError, isFetching } = useGetPokemonByNameQuery(searchQuery);
    const { name: foundedPokemonFromSearch } = { ...data };

    return (
        <div className="pokemon">
            {isFetching ? (
                <Loader />
            ) : isError ? (
                <div>Incorrect Input Value</div>
            ) : foundedPokemonFromSearch ? (
                <div className="pokemon-cards">
                    <div className="pokemon-card">
                        {foundedPokemonFromSearch}
                    </div>
                </div>
            ) : (
                <div className="pokemon-cards grid">
                    {storeData.map((pokemon, index) => (
                        <div className="pokemon-card" key={index}>
                            {pokemon.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
