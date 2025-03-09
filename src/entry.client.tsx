import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';
import { ThemeProvider } from './util/ThemeProvider.tsx';
import React from 'react';
import { HydratedRouter } from 'react-router/dom';

ReactDOM.hydrateRoot(
    document,
    <React.StrictMode>
        <ErrorBoundary>
            <ThemeProvider>
                <Provider store={store}>
                    <HydratedRouter />
                </Provider>
            </ThemeProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
