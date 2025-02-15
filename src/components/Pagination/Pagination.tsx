import { useEffect } from 'react';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../store/pageReducer';
import { useListPostsQuery } from '../../APISlice/ApiSlice';
import { addData } from '../../store/dataReducer';
import { RootState } from '../../store/store';

export default function Pagination() {
    const POKEMONS_IN_LIST = 20;
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.page.value);
    const { data } = useListPostsQuery((page - 1) * POKEMONS_IN_LIST);
    const { results } = { ...data };

    useEffect(() => {
        if (results) {
            dispatch(addData(results));
        }
    }, [results, dispatch]);

    const handleClickPlus = () => {
        dispatch(increment());
    };

    const handleClickMinus = () => {
        if (page === 1) return;
        dispatch(decrement());
    };

    return (
        <div className="pagination">
            <button
                className={'pagination-btn' + (page === 1 ? ' disabled' : '')}
                onClick={() => {
                    handleClickMinus();
                }}
            >
                {'<'}
            </button>
            <span>{page}</span>
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
