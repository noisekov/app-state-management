import { useEffect, useState } from 'react';
import './Pagination.css';
import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';

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
    getPage: (page: number) => void;
    setFirstPage: number;
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
    getPage,
    setFirstPage,
}: PaginationProps) {
    const MAX_PAGE_LOAD = 20;
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(MAX_PAGE_LOAD);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
        const page = setFirstPage + 1;
        setPage(page);

        if (page === 1) {
            setMaxPage(MAX_PAGE_LOAD);
        }
    }, [setFirstPage]);

    const handleClickPlus = () => {
        const pageUp = page + 1;

        setPage(pageUp);
        navigate(`/search/${pageUp}`);
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

        setPage(pageDown);
        navigate(`/search/${pageDown}`);
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
                getPage(page - 1);
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
        getPage(page - 1);
    };

    async function requestTemplate(url: string) {
        const request = await fetch(url);
        const { status } = await request;

        if (status !== 200) {
            setIsLoading(false);
            newTemplate(resultObj);
            getPage(page - 1);
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
