import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import Pagination from '../Pagination/Pagination';
import './Pokemon.css';
import React, { useEffect, useRef, useState } from 'react';

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

    const [additionalInformation, setAdditionalInformation] =
        useState<setAdditionalInformationI>({
            weight: '',
            height: '',
            types: [],
        });
    const previousOnInputData = useRef(onInputData);
    useEffect(() => {
        if (previousOnInputData.current !== onInputData) {
            setInputData(onInputData);
        }
    }, [onInputData]);

    const { sprites, name, abilities, isInputEmpty } = inputData;

    const handleNewTemplate = (data: requestDataI) => {
        setInputData(data);
    };

    const handleCurrentPage = (page: number) => {
        setCurrentPokemonIndex(page);
    };

    const getPokemonInformation = async () => {
        if (additionalModalOpen) {
            setAdditionalInformation({
                weight: '',
                height: '',
                types: [],
            });
            setAdditionalModalOpen(false);
            return;
        }

        const request = await fetch(inputData.url[currentPokemonIndex]);
        const { weight, height, types } = await request.json();
        const typesOfPokemons = types.map(
            (typesElements: { type: { name: string } }) =>
                typesElements.type.name
        );
        setAdditionalInformation({ weight, height, types: typesOfPokemons });
        setAdditionalModalOpen(true);
    };

    const closeAddiionalInformation = () => {
        setAdditionalInformation({
            weight: '',
            height: '',
            types: [],
        });
        setAdditionalModalOpen(false);
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
            {isInputEmpty && (
                <div className="pokemon-pagination">
                    <Pagination
                        getPage={handleCurrentPage}
                        paginationData={inputData}
                        newTemplate={handleNewTemplate}
                        setCloseAddiionalInformation={closeAddiionalInformation}
                    />
                </div>
            )}
        </div>
    );
}
