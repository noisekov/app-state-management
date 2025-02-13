import { useEffect, useState } from 'react';
import './Pagination.css';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { decrement, increment } from '../../store/pageReducer';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
    isInputEmpty: boolean;
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
    const MAX_PAGE_LOAD = 20;
    const [maxPage, setMaxPage] = useState(MAX_PAGE_LOAD);
    const [isLoading, setIsLoading] = useState(false);
    const page = useSelector((state: RootState) => state.page.value);
    const dispatch = useDispatch();

    const resultObj: requestDataI = {
        name: '',
        abilities: [],
        sprites: '',
        next: '',
        previous: '',
        url: [],
        isInputEmpty: true,
    };

    useEffect(() => {
        if (page === 1) {
            setMaxPage(MAX_PAGE_LOAD);
        }
    }, [page]);

    const handleClickPlus = () => {
        const pageUp = page + 1;

        dispatch(increment());
        const requestData =
            page % MAX_PAGE_LOAD ? 'currentRequest' : 'nextRequest';
        setMaxPage(maxPage === pageUp ? pageUp + MAX_PAGE_LOAD : maxPage);
        sendRequest(pageUp, requestData);
    };

    const handleClickMinus = () => {
        if (page === 1) {
            return;
        }
        const pageDown = page - 1;

        dispatch(decrement());
        const requestData =
            pageDown % MAX_PAGE_LOAD ? 'currentRequest' : 'previousRequest';
        sendRequest(pageDown, requestData);
    };

    const sendRequest = async (page: number, requestData: requestData) => {
        setIsLoading(true);

        if (requestData === 'currentRequest') {
            const data = await requestTemplate(
                paginationData.url[(page - 1) % MAX_PAGE_LOAD]
            );
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

            const data = await requestTemplate(fetchElement);
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
                data.results[(page - 1) % MAX_PAGE_LOAD].url
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

    async function requestTemplate(url: string) {
        const request = await fetch(url);
        const { status } = await request;

        if (status !== 200) {
            setIsLoading(false);
            newTemplate(resultObj);
        }

        return await request.json();
    }

    return isLoading ? (
        <Loader />
    ) : (
        <div className="pagination">
            <button
                className={'pagination-btn' + (page === 1 ? ' disabled' : '')}
                onClick={() => {
                    handleClickMinus();
                }}
            >
                {'<'}
            </button>
            <span>
                {page} / {maxPage}
            </span>
            <button
                className="pagination-btn"
                onClick={() => {
                    handleClickPlus();
                }}
            >
                {'>'}
            </button>
        </div>
    );
}
