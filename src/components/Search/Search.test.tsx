import { render } from '@testing-library/react';
import Search from './Search';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Search component', () => {
    it('renders the search form', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store} key="1">
                <Search />
            </Provider>
        );
        expect(getByPlaceholderText('For example Pikachu')).toBeInTheDocument();
    });
});
