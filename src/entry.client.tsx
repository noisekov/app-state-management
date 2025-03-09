import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';
import { HydratedRouter } from 'react-router/dom';

ReactDOM.hydrateRoot(
    document,
    <React.StrictMode>
        <HydratedRouter />
    </React.StrictMode>
);
