import Loader from '../Loader/Loader';
import './Search.css';
import React, { SyntheticEvent, useEffect, useState } from 'react';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
}

interface PokemonData {
    name: string;
    sprites: { front_default: string };
    abilities: { ability: { name: string } }[];
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
        const resultObj: requestDataI = {
            name: '',
            abilities: [],
            sprites: '',
            next: '',
            previous: '',
            url: [],
        };
        setIsLoading(true);
        const request = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${value}`
        );
        const { status } = await request;

        if (status !== 200) {
            setIsLoading(false);
            props.onInputData(resultObj);
        }

        const data = await request.json();

        if (value) {
            parseObj(data);
        } else {
            resultObj.url = data.results.map(
                (result: { url: string }) => result.url
            );
            resultObj.previous = data.previous;
            resultObj.next = data.next;

            const requestOnePokemonInList = await fetch(data.results[0].url);
            const { status: statusOnePokemonOnList } =
                await requestOnePokemonInList;

            if (statusOnePokemonOnList !== 200) {
                props.onInputData(resultObj);
            }

            const dataOnePokemonInList = await requestOnePokemonInList.json();

            parseObj(dataOnePokemonInList);
        }

        function parseObj(data: PokemonData) {
            resultObj.name = data.name;
            resultObj.sprites = data.sprites.front_default;
            data.abilities.forEach((ability: { ability: { name: string } }) => {
                resultObj.abilities.push(ability.ability.name);
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
