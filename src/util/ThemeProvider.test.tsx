import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('ThemeProvider', () => {
    it('renders children', () => {
        const children = <div>Test children</div>;
        const { getByText } = render(<ThemeProvider>{children}</ThemeProvider>);
        expect(getByText('Test children')).toBeInTheDocument();
    });
});
