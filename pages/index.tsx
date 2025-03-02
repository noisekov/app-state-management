import Search from '../src/components/Search/Search';
import Pokemon from '../src/components/Pokemon/Pokemon';
import Pagination from '../src/components/Pagination/Pagination';
import { useTheme } from '../src/hooks/UseTheme';
import Button from '../src/components/Button/Button';

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
            <Button
                type="button"
                className="button button--theme"
                onClick={toggleTheme}
                text={darkMode ? 'Theme light' : 'Theme dark'}
            />
        </>
    );
}
