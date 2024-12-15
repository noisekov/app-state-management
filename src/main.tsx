import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/class-component/" element={<App />} />
                    <Route
                        path="/class-component/*"
                        element={<div>страницы нет</div>}
                    />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);
