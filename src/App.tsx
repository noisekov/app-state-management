import Button from './components/Button/Button';
import Pagination from './components/Pagination/Pagination';
import Pokemon from './components/Pokemon/Pokemon';
import Search from './components/Search/Search';
import { useTheme } from './hooks/UseTheme';

export default function App() {
    const { toggleTheme, darkMode } = useTheme();

    return (
        <div className="container">
            <div className="page">
                <div className="top">
                    <Search />
                </div>
                <div className="bottom">
                    <Pokemon />
                    <Pagination />
                </div>
            </div>
            <Button
                type="button"
                className="button button--theme"
                onClick={toggleTheme}
                text={darkMode ? 'Theme light' : 'Theme dark'}
            />
        </div>
    );
}
