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
    results: { url: string }[];
    previous: string;
    next: string;
}

type requestData = 'nextRequest' | 'currentRequest' | 'previousRequest';

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
        const requestData = page % 20 === 0 ? 'nextRequest' : 'currentRequest';
        request(pageUp, requestData);
    };

    const handleClickMinus = () => {
        if (page === 1) {
            return;
        }
        const pageDown = page - 1;

        setPage(pageDown);
        navogate(`/class-component/search/${pageDown}`);
        const requestData =
            pageDown % 20 === 0 ? 'previousRequest' : 'currentRequest';
        request(pageDown, requestData);
    };

    const request = async (page: number, requestData: requestData) => {
        setIsLoading(true);

        if (requestData === 'currentRequest') {
            const request = await fetch(paginationData.url[(page - 1) % 20]);
            const { status } = await request;

            if (status !== 200) {
                setIsLoading(false);
                newTemplate(resultObj);
            }

            const data = await request.json();
            parseObj(data);
        }

        if (
            requestData === 'nextRequest' ||
            requestData === 'previousRequest'
        ) {
            const fetchElement =
                requestData === 'nextRequest'
                    ? paginationData.next
                    : paginationData.previous;

            const request = await fetch(fetchElement);
            const { status } = await request;

            if (status !== 200) {
                setIsLoading(false);
                newTemplate(resultObj);
            }

            const data = await request.json();
            await parseObjWhenNextOrPrevious(data);
        }

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

        async function parseObjWhenNextOrPrevious(data: PokemonData) {
            resultObj.url = data.results.map(
                (result: { url: string }) => result.url
            );
            resultObj.previous = data.previous;
            resultObj.next = data.next;
            const requestOnePokemonInList = await fetch(
                data.results[(page - 1) % 20].url
            );
            const { status: statusOnePokemonOnList } =
                await requestOnePokemonInList;

            if (statusOnePokemonOnList !== 200) {
                setIsLoading(false);
                newTemplate(resultObj);
            }

            const dataOnePokemonInList = await requestOnePokemonInList.json();
            resultObj.name = dataOnePokemonInList.name;
            resultObj.sprites = dataOnePokemonInList.sprites.front_default;
            resultObj.abilities = [];
            dataOnePokemonInList.abilities.forEach(
                (ability: { ability: { name: string } }) => {
                    resultObj.abilities.push(ability.ability.name);
                }
            );
        }

        setIsLoading(false);
        newTemplate(resultObj);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="pagination">
            <button
                className={'pagination-btn' + (page === 1 ? ' disabled' : '')}
                onClick={handleClickMinus}
            >
                {'<'}
            </button>
            <span>{page}</span>
            <button className="pagination-btn" onClick={handleClickPlus}>
                {'>'}
            </button>
        </div>
    );
}
