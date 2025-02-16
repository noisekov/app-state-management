import { useDispatch } from 'react-redux';
import './Search.css';
import { SyntheticEvent, useEffect, useState } from 'react';

import { addSearch, cleanSearch } from '../../store/searchReducer';

export default function Search() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const storedData: string = localStorage.getItem('data') || '';
        setQuery(storedData);
        dispatch(addSearch(storedData));
    }, [dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);

        if (event.target.value === '') {
            localStorage.setItem('data', event.target.value);
            dispatch(cleanSearch());
        }
    };

    const handleSubmit = async (
        event: SyntheticEvent<HTMLFormElement, SubmitEvent>
    ) => {
        event.preventDefault();
        const inputValue = (
            (event.target as HTMLFormElement)?.elements[0] as HTMLInputElement
        ).value.trim();

        localStorage.setItem('data', inputValue);
        dispatch(addSearch(inputValue));
    };

    return (
        <form className="form-search" onSubmit={handleSubmit}>
            <input
                value={query}
                onChange={handleChange}
                type="search"
                className="input-search"
                placeholder="For example Pikachu"
            />
            <button className="button" type="submit">
                Search
            </button>
        </form>
    );
}
