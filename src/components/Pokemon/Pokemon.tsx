import './Pokemon.css';
import React, { useEffect, useRef, useState } from 'react';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
}

interface PokemonProps {
    onInputData: requestDataI[];
}

export default function Pokemon({ onInputData }: PokemonProps) {
    const [inputData, setInputData] = useState<requestDataI[]>([
        {
            name: '',
            abilities: [],
            sprites: '',
        },
    ]);

    const previousOnInputData = useRef(onInputData);
    useEffect(() => {
        if (previousOnInputData.current !== onInputData) {
            setInputData(onInputData);
        }
    }, [onInputData]);

    return (
        <div className="pokemon-cards__wrapper">
            <div className="pokemon-cards">
                {' '}
                {inputData.map((pokemon) => {
                    const { sprites, name, abilities } = pokemon;
                    return (
                        <div key={name} className="pokemon-card">
                            <h1>
                                {name ? 'Pokemon' : 'Incorrect input value'}
                            </h1>
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
                    );
                })}
            </div>
        </div>
    );
}
