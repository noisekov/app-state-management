import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
    toggleTheme: () => {},
    darkMode: true,
});

export const useTheme = () => {
    return useContext(ThemeContext);
};
