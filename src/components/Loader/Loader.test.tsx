import { render } from '@testing-library/react';
import Loader from './Loader';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Loader component', () => {
    it('renders pulse container and renders three pulse bubbles', () => {
        const { getByTestId } = render(<Loader />);
        expect(getByTestId('pulse-container')).toBeInTheDocument();
    });
});
