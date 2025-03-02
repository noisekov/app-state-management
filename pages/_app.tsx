import '../styles/globals.css';
import '../styles/index.css';
import React from 'react';
import App from './index';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/util/ThemeProvider';

function MyApp() {
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

export default MyApp;
