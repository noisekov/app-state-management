import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';
import './Search.css';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../../store/pageReducer';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
    isInputEmpty: boolean;
}

interface PokemonData {
    name: string;
    sprites: { front_default: string };
    abilities: { ability: { name: string } }[];
}

interface SearchProps {
    onInputData: (data: requestDataI) => void;
}

export default function Search({ onInputData }: SearchProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [querySearch, setQuerySearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedData: string | null = localStorage.getItem('data') || '';
        setQuerySearch(storedData);
        request(storedData);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            isInputEmpty: true,
        };
        setIsLoading(true);
        const request = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${value}`
        );
        const { status } = await request;

        if (status !== 200) {
            setIsLoading(false);
            onInputData(resultObj);
        }

        const data = await request.json();

        if (value) {
            parseObj(data, false);
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
                onInputData(resultObj);
            }

            const dataOnePokemonInList = await requestOnePokemonInList.json();

            navigate(`/search/1`);
            parseObj(dataOnePokemonInList, true);
        }

        function parseObj(data: PokemonData, isInputEmpty: boolean) {
            resultObj.name = data.name;
            resultObj.sprites = data.sprites.front_default;
            data.abilities.forEach((ability: { ability: { name: string } }) => {
                resultObj.abilities.push(ability.ability.name);
            });
            resultObj.url.push(`https://pokeapi.co/api/v2/pokemon/${value}`);
            resultObj.isInputEmpty = isInputEmpty;
        }

        setIsLoading(false);
        onInputData(resultObj);
        dispatch(reset());
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
        <form className="form-search" onSubmit={handleSubmit}>
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
