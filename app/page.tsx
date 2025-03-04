'use client';
import Search from '../src/components/Search/Search';
import Pokemon from '../src/components/Pokemon/Pokemon';
import Pagination from '../src/components/Pagination/Pagination';
import { useTheme } from '../src/hooks/UseTheme';
import Button from '../src/components/Button/Button';

import React from 'react';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/util/ThemeProvider';
import App from '../src/App';

export default function Page() {
    return (
        <React.StrictMode>
            <ErrorBoundary>
                <ThemeProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </ThemeProvider>
            </ErrorBoundary>
        </React.StrictMode>
    );
}
