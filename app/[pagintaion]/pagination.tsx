'use client';
import { useEffect, useState } from 'react';
import styles from '../../src/components/pagination/Pagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, set } from '../../src/store/pageReducer';
import { useListPostsQuery } from '../../src/APISlice/ApiSlice';
import { addData } from '../../src/store/dataReducer';
import { RootState } from '../../src/store/store';
import Button from '../../src/components/Button/Button';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Pagination() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchPage = searchParams.get('page');
    const POKEMONS_IN_LIST = 20;
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.page.value);
    const { data } = useListPostsQuery((page - 1) * POKEMONS_IN_LIST);
    const { results } = { ...data };
    const search = useSelector((state: RootState) => state.searchQuery);
    const [hasSearch, setHasSearch] = useState(false);

    useEffect(() => {
        if (searchPage) return;

        router.push(`?page=${page}`, { scroll: false });
    }, [searchPage, page, router]);

    useEffect(() => {
        if (results) {
            dispatch(addData(results));
        }
    }, [results, dispatch]);

    useEffect(() => {
        setHasSearch(!!search);
    }, [search]);

    useEffect(() => {
        if (searchPage) {
            dispatch(set(+searchPage));
        }
    }, [searchPage, dispatch]);

    const handleClickPlus = () => {
        dispatch(increment());
        router.push(`?page=${page + 1}`, { scroll: false });
    };

    const handleClickMinus = () => {
        if (page === 1) return;
        dispatch(decrement());
        router.push(`?page=${page - 1}`, { scroll: false });
    };

    return hasSearch ? null : (
        <div className={styles.pagination}>
            <Button
                type="button"
                className={`${styles['pagination-btn']} ${page === 1 ? ` ${styles.disabled}` : ''}`}
                onClick={() => handleClickMinus()}
                text="<"
            />
            <span>{page}</span>
            <Button
                type="button"
                className={styles['pagination-btn']}
                onClick={() => handleClickPlus()}
                text=">"
            />
        </div>
    );
}
