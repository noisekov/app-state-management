import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import NotFound from './page/NotFound.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/:search?/:page?/*" element={<App />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);
