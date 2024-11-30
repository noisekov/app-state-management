import React, { useState } from 'react';
import './Pagination.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
}

interface PaginationProps {
    paginationData: requestDataI;
    newTemplate: (data: requestDataI) => void;
}

interface PokemonData {
    name: string;
    sprites: { front_default: string };
    abilities: { ability: { name: string } }[];
}

export default function Pagination({
    paginationData,
    newTemplate,
}: PaginationProps) {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navogate = useNavigate();
    const resultObj: requestDataI = {
        name: '',
        abilities: [],
        sprites: '',
        next: '',
        previous: '',
        url: [],
    };

    const handleClickPlus = () => {
        const pageUp = page + 1;

        setPage(pageUp);
        navogate(`/class-component/search/${pageUp}`);
        request(pageUp);
    };

    const handleClickMinus = () => {
        const pageDown = page - 1;

        setPage(pageDown);
        navogate(`/class-component/search/${pageDown}`);
        request(pageDown);
    };

    const request = async (page: number) => {
        setIsLoading(true);
        const request = await fetch(paginationData.url[page - 1]);
        const { status } = await request;

        if (status !== 200) {
            setIsLoading(false);
            newTemplate(resultObj);
        }

        const data = await request.json();
        parseObj(data);

        function parseObj(data: PokemonData) {
            resultObj.name = data.name;
            resultObj.sprites = data.sprites.front_default;
            resultObj.abilities = [];
            data.abilities.forEach((ability: { ability: { name: string } }) => {
                resultObj.abilities.push(ability.ability.name);
            });
            resultObj.next = paginationData.next;
            resultObj.previous = paginationData.previous;
            resultObj.url = paginationData.url;
        }

        setIsLoading(false);
        newTemplate(resultObj);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="pagination">
            <button onClick={handleClickMinus}>LEFT</button>
            <span>{page}</span>
            <button onClick={handleClickPlus}>right</button>
        </div>
    );
}
