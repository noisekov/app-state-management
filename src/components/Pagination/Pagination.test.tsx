import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Pagination component', () => {
    it('renders pagination buttons', () => {
        render(
            <Provider store={store}>
                <Pagination />
            </Provider>
        );
        expect(screen.getByText('<')).toBeInTheDocument();
        expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('renders current page number', () => {
        render(
            <Provider store={store}>
                <Pagination />
            </Provider>
        );
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
        render(
            <Provider store={store}>
                <Pagination />
            </Provider>
        );
        const prevButton = screen.getByText('<');
        expect(prevButton).toHaveClass('disabled');
    });
});
