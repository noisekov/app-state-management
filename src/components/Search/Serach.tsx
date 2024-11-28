import Loader from '../Loader/Loader';
import './Search.css';
import React, { SyntheticEvent, useEffect, useState } from 'react';

interface requestDataI {
    name: string[];
    abilities: string[];
    sprites: string;
}

interface SerachProps {
    onInputData: (data: requestDataI) => void;
}

export default function Serach(props: SerachProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [querySearch, setQuerySearch] = useState('');

    useEffect(() => {
        const storedData: string | null = localStorage.getItem('data') || '';
        setQuerySearch(storedData);
        request(storedData);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuerySearch(event.target.value);
    };

    const request = async (value: string) => {
        setIsLoading(true);
        const resultObj: requestDataI = {
            name: [],
            abilities: [],
            sprites: '',
        };
        const request = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${value}`,
            {
                method: 'GET',
            }
        );
        const { status } = await request;

        if (status !== 200) {
            setIsLoading(false);
            props.onInputData(resultObj);
        }

        const data = await request.json();

        if (value) {
            resultObj.name.push(data.name);
            resultObj.sprites = data.sprites.front_default;
            data.abilities.forEach((ability: { ability: { name: string } }) => {
                resultObj.abilities.push(ability.ability.name);
            });
        } else {
            data.results.forEach((pokemon: { name: string; url: string }) => {
                resultObj.name.push(pokemon.name);
            });
        }

        setIsLoading(false);
        props.onInputData(resultObj);
    };

    const handleSubmit = async (
        event: SyntheticEvent<HTMLFormElement, SubmitEvent>
    ) => {
        event.preventDefault();
        const inputValue = (
            (event.target as HTMLFormElement)?.elements[0] as HTMLInputElement
        ).value.trim();

        localStorage.setItem('data', inputValue);
        request(inputValue);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <form onSubmit={handleSubmit}>
            <input
                value={querySearch}
                onChange={handleChange}
                type="search"
                className="input-search"
            />
            <button className="button" type="submit">
                Search
            </button>
        </form>
    );
}
