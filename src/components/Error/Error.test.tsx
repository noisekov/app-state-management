import { act, render, screen } from '@testing-library/react';
import Error from './Error';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

test('renders error page when thrown error', () => {
    try {
        throw new globalThis.Error('Test error');
    } catch {
        act(() => {
            render(<Error />);
        });
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Back to App')).toBeInTheDocument();
    }
});
