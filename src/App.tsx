import './App.css';
import React, { useState } from 'react';
import Serach from './components/Search/Serach';
import Pokemon from './components/Pokemon/Pokemon';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
}
export default function App() {
    const [inputData, setInputData] = useState<requestDataI>({
        name: '',
        abilities: [],
        sprites: '',
        next: '',
        previous: '',
        url: [],
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
                    <Serach onInputData={handleData} />
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
