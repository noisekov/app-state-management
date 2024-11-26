import './Pokemon.css';
import React, { useEffect, useRef, useState } from 'react';

interface requestDataI {
    name: string[];
    abilities: string[];
    sprites: string;
}

interface PokemonProps {
    onInputData: requestDataI;
}

export default function Pokemon({ onInputData }: PokemonProps) {
    const [inputData, setInputData] = useState<requestDataI>({
        name: [],
        abilities: [],
        sprites: '',
    });

    const previousOnInputData = useRef(onInputData);
    useEffect(() => {
        if (previousOnInputData.current !== onInputData) {
            setInputData(onInputData);
        }
    }, [onInputData]);
    const { sprites, name, abilities } = inputData;

    return (
        <div className="pokemon-card">
            <h1>
                {name.length
                    ? name.length === 1
                        ? 'Pokemon'
                        : 'Examples of Pokemon'
                    : 'Incorrect input value'}
            </h1>
            {name.length === 1 && sprites && (
                <div className="pokemon-card__image">
                    <img src={sprites} alt={name[0]} width={150} height={150} />
                </div>
            )}
            {!!name.length && (
                <p className="pokemon-card__text">
                    {name.length === 1
                        ? 'name: ' + name[0]
                        : 'names: ' + name.join(', ')}
                </p>
            )}
            {!!abilities.length && (
                <p className="pokemon-card__text">
                    abilities: {abilities.join(', ')}
                </p>
            )}
        </div>
    );
}
