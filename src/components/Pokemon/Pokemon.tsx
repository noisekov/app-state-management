import './Pokemon.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import {
    useGetPokemonByNameQuery,
    useGetPokemonDataQuery,
} from '../../APISlice/ApiSlice';
import Loader from '../Loader/Loader';
import {
    addCheckedPokemon,
    removeCheckedPokemon,
} from '../../store/chekedPokemons';
import ModalSelectedPokemon from '../ModalSelectedPokemon/ModalSelectedPokemon';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

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

    const [showModal, setShowModal] = useState(false);
    const [pokemonName, setPokemonName] = useState('');
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const getInfoForModal = (name: string) => {
        setPokemonName(name);
    };

    const { data: pokemonData, isSuccess } =
        useGetPokemonDataQuery(pokemonName);
    const [dataForModal, setDataForModal] = useState({
        img: '',
        height: 0,
        name: '',
        weight: 0,
        types: [''],
    });

    useEffect(() => {
        if (isSuccess) {
            const { img, height, name, weight, types } = pokemonData;

            setDataForModal({
                height,
                img,
                name,
                weight,
                types,
            });
        }
    }, [pokemonData, isSuccess]);

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
                        <button
                            className="button"
                            onClick={() => {
                                toggleModal();
                                getInfoForModal(foundedPokemonFromSearch);
                            }}
                        >
                            Info
                        </button>
                    </div>
                </div>
            ) : (
                <div className="pokemon-cards grid">
                    {storeData.map((pokemon) => (
                        <div className="pokemon-card" key={pokemon.name}>
                            <label className="pokemon-card__wrapper">
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
                            <button
                                className="button"
                                onClick={() => {
                                    toggleModal();
                                    getInfoForModal(pokemon.name);
                                }}
                            >
                                Info
                            </button>
                        </div>
                    ))}
                    <ModalSelectedPokemon />
                </div>
            )}
            {showModal && (
                <AdditionalInfo
                    toggleModal={toggleModal}
                    dataForModal={dataForModal}
                />
            )}
        </div>
    );
}
