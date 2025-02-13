import { useState, useEffect } from 'react';
import { ThemeContext } from '../hooks/UseTheme.tsx';

interface ThemeContextProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeContextProps) => {
    const [darkMode, setDarkMode] = useState(true);
    const toggleTheme = () => setDarkMode((mode) => !mode);

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            darkMode ? 'dark' : 'light'
        );
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
