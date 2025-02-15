import './Pokemon.css';
import { useSelector } from 'react-redux';
import { useGetPokemonByNameQuery } from '../../APISlice/ApiSlice';
import Loader from '../Loader/Loader';
import { RootState } from '../../store/store';

export default function Pokemon() {
    const { data, error, isLoading } = useGetPokemonByNameQuery('');
    const storeData = useSelector((state: RootState) => state.data);

    return (
        <div className="pokemon">
            {error ? (
                <h1>Incorrect input value</h1>
            ) : isLoading ? (
                <Loader />
            ) : data ? (
                <div className="pokemon-cards">
                    {storeData.map((pokemon, index) => (
                        <div className="pokemon-card" key={index}>
                            {pokemon.name}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
