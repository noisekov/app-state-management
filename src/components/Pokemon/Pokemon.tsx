import { useNavigate } from 'react-router';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import './Pokemon.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
    isInputEmpty: boolean;
}

interface PokemonProps {
    onInputData: requestDataI;
}

interface setAdditionalInformationI {
    weight: string;
    height: string;
    types: string[];
}

export default function Pokemon({ onInputData }: PokemonProps) {
    const MAX_PAGE_LOAD = 20;
    const [inputData, setInputData] = useState<requestDataI>({
        name: '',
        abilities: [],
        sprites: '',
        next: '',
        previous: '',
        url: [],
        isInputEmpty: false,
    });
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
    const [additionalModalOpen, setAdditionalModalOpen] = useState(false);
    const navigate = useNavigate();
    const [additionalInformation, setAdditionalInformation] =
        useState<setAdditionalInformationI>({
            weight: '',
            height: '',
            types: [],
        });
    const page = useSelector((state: RootState) => state.page.value);

    const previousOnInputData = useRef(onInputData);
    useEffect(() => {
        if (previousOnInputData.current !== onInputData) {
            setInputData(onInputData);
        }

        setAdditionalInformation({
            weight: '',
            height: '',
            types: [],
        });
        setAdditionalModalOpen(false);
        setCurrentPokemonIndex((page - 1) % MAX_PAGE_LOAD);
    }, [onInputData, page]);

    useEffect(() => {
        setCurrentPokemonIndex((page - 1) % MAX_PAGE_LOAD);
    }, [page]);

    const closeAddiionalInformation = () => {
        setAdditionalInformation({
            weight: '',
            height: '',
            types: [],
        });
        setAdditionalModalOpen(false);
        navigate(-1);
    };

    const { sprites, name, abilities, url } = inputData;

    const getPokemonInformation = async () => {
        if (additionalModalOpen) {
            setAdditionalInformation({
                weight: '',
                height: '',
                types: [],
            });
            setAdditionalModalOpen(false);
            navigate(-1);

            return;
        }
        const request = await fetch(url[currentPokemonIndex]);
        const { weight, height, types } = await request.json();
        const typesOfPokemons = types.map(
            (typesElements: { type: { name: string } }) =>
                typesElements.type.name
        );
        setAdditionalInformation({ weight, height, types: typesOfPokemons });
        setAdditionalModalOpen(true);
        navigate(`?frontpage=${page}&details=1`);
    };

    return (
        <div className="pokemon">
            <div className="pokemon-cards">
                <div className="pokemon-card" onClick={getPokemonInformation}>
                    <h1>{name ? 'Pokemon' : 'Incorrect input value'}</h1>
                    {name && sprites && (
                        <div className="pokemon-card__image">
                            <img
                                src={sprites}
                                alt={name}
                                width={150}
                                height={150}
                            />
                        </div>
                    )}
                    {!!name && (
                        <p className="pokemon-card__text">
                            {name ? `name: ${name}` : ''}
                        </p>
                    )}
                    {!!abilities.length && (
                        <p className="pokemon-card__text">
                            abilities: {abilities.join(', ')}
                        </p>
                    )}
                </div>
                {additionalModalOpen && (
                    <AdditionalInfo
                        closeAddiionalInformation={closeAddiionalInformation}
                        additionalInformation={additionalInformation}
                    />
                )}
            </div>
        </div>
    );
}
