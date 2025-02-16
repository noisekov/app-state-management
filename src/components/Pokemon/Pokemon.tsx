import './Pokemon.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Pokemon() {
    const storeData = useSelector((state: RootState) => state.data);

    return (
        <div className="pokemon">
            <div className="pokemon-cards">
                {storeData.map((pokemon, index) => (
                    <div className="pokemon-card" key={index}>
                        {pokemon.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
