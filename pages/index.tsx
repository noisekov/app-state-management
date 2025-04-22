import Search from '../src/components/Search/Search';
import Pokemon from '../src/components/Pokemon/Pokemon';
import { useTheme } from '../src/hooks/UseTheme';
import Button from '../src/components/Button/Button';
import Pagination from './pagination/[pagination]';

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
