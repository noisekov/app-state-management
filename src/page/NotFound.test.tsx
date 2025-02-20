import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { expect, test } from 'vitest';

test('renders 404 page when URL is incorrect', () => {
    const history = createMemoryHistory();
    history.push('/incorrect-url');

    render(
        <Provider store={store}>
            <NotFound />
        </Provider>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
});
