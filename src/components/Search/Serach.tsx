import Loader from '../Loader/Loader';
import './Search.css';
import React, { SyntheticEvent, useEffect, useState } from 'react';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
}

interface PokemonData {
    name: string;
    sprites: { front_default: string };
    abilities: { ability: { name: string } }[];
}

interface SerachProps {
    onInputData: (data: requestDataI[]) => void;
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
        const arrayResultObj: requestDataI[] = [];
        const resultObj: requestDataI = {
            name: '',
            abilities: [],
            sprites: '',
        };
        setIsLoading(true);
        const request = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${value}`
        );
        const { status } = await request;

        if (status !== 200) {
            setIsLoading(false);
            arrayResultObj.push(resultObj);
            props.onInputData(arrayResultObj);
        }

        const data = await request.json();

        if (value) {
            parseObj(data);
        } else {
            for (const prop in data.results) {
                const requestPokemonInList = await fetch(
                    data.results[prop].url
                );
                const { status: statusRequest } = await requestPokemonInList;

                if (statusRequest !== 200) {
                    arrayResultObj.push(resultObj);
                }

                const dataPokemonInList = await requestPokemonInList.json();
                parseObj(dataPokemonInList);
            }
        }

        function parseObj(data: PokemonData) {
            const resultObj: requestDataI = {
                name: '',
                abilities: [],
                sprites: '',
            };

            resultObj.name = data.name;
            resultObj.sprites = data.sprites.front_default;
            data.abilities.forEach((ability: { ability: { name: string } }) => {
                resultObj.abilities.push(ability.ability.name);
            });
            arrayResultObj.push(resultObj);
        }

        setIsLoading(false);
        props.onInputData(arrayResultObj);
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
