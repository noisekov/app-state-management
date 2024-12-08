import './App.css';
import React, { useState } from 'react';
import Search from './components/Search/Search';
import Pokemon from './components/Pokemon/Pokemon';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
    isInputEmpty: boolean;
}
export default function App() {
    const [inputData, setInputData] = useState<requestDataI>({
        name: '',
        abilities: [],
        sprites: '',
        next: '',
        previous: '',
        url: [],
        isInputEmpty: true,
    });
    const [isError, setError] = useState(false);

    const handleData = (inputData: requestDataI) => {
        setInputData(inputData);
    };

    if (isError) {
        throw new Error('I crashed!');
    }

    return (
        <>
            <div className="page">
                <div className="top">
                    <Search onInputData={handleData} />
                </div>

                <div className="bottom">
                    <Pokemon onInputData={inputData} />
                </div>
            </div>
            <button
                className="button button--error"
                onClick={() => {
                    setError(true);
                }}
            >
                throw an error
            </button>
        </>
    );
}
