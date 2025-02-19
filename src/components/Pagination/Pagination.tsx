import { useEffect, useState } from 'react';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../store/pageReducer';
import { useListPostsQuery } from '../../APISlice/ApiSlice';
import { addData } from '../../store/dataReducer';
import { RootState } from '../../store/store';
import Button from '../Button/Button';

export default function Pagination() {
    const POKEMONS_IN_LIST = 20;
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.page.value);
    const { data } = useListPostsQuery((page - 1) * POKEMONS_IN_LIST);
    const { results } = { ...data };
    const search = useSelector((state: RootState) => state.searchQuery);
    const [hasSearch, setHasSearch] = useState(false);

    useEffect(() => {
        if (results) {
            dispatch(addData(results));
        }
    }, [results, dispatch]);

    useEffect(() => {
        setHasSearch(!!search);
    }, [search]);

    const handleClickPlus = () => {
        dispatch(increment());
    };

    const handleClickMinus = () => {
        if (page === 1) return;
        dispatch(decrement());
    };

    return hasSearch ? null : (
        <div className="pagination">
            <Button
                type="button"
                className={'pagination-btn' + (page === 1 ? ' disabled' : '')}
                onClick={() => handleClickMinus()}
                text="<"
            />
            <span>{page}</span>
            <Button
                type="button"
                className="pagination-btn"
                onClick={() => handleClickPlus()}
                text=">"
            />
        </div>
    );
}
