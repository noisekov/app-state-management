import './App.css';
import Search from './components/Search/Search';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';
import { useTheme } from './hooks/UseTheme';

export default function App() {
    const { toggleTheme, darkMode } = useTheme();

    return (
        <>
            <div className="page">
                <div className="top">
                    <Search />
                </div>
                <div className="bottom">
                    <Pokemon />
                    <Pagination />
                </div>
            </div>
            <button className="button button--theme" onClick={toggleTheme}>
                {darkMode ? 'Theme light' : 'Theme dark'}
            </button>
        </>
    );
}
