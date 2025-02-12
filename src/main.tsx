import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import NotFound from './page/NotFound.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';
import { ThemeProvider } from './util/ThemeProvider.tsx';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ErrorBoundary>
            <ThemeProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/:search?/:page?/*"
                                element={<App />}
                            />
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
