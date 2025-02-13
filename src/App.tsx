import './App.css';
import { useState } from 'react';
import Search from './components/Search/Search';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';
import { useTheme } from './hooks/UseTheme';

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
    const handleData = (inputData: requestDataI) => {
        setInputData(inputData);
    };
    const handleNewTemplate = (data: requestDataI) => {
        setInputData(data);
    };
    const { toggleTheme, darkMode } = useTheme();
    const { isInputEmpty, url } = inputData;

    return (
        <>
            <div className="page">
                <div className="top">
                    <Search onInputData={handleData} />
                </div>
                <div className="bottom">
                    <Pokemon onInputData={inputData} />
                    {isInputEmpty && !!url.length && (
                        <Pagination
                            paginationData={inputData}
                            newTemplate={handleNewTemplate}
                        />
                    )}
                </div>
            </div>
            <button className="button button--theme" onClick={toggleTheme}>
                {darkMode ? 'Theme light' : 'Theme dark'}
            </button>
        </>
    );
}
