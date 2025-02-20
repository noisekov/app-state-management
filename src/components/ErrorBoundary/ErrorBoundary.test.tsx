import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('ErrorBoundary component', () => {
    it('renders Error component when an error occurs', () => {
        const ErrorThrowingComponent = () => {
            throw new Error('Test error');
        };

        const { getByText } = render(
            <ErrorBoundary>
                <div>
                    <ErrorThrowingComponent />
                </div>
            </ErrorBoundary>
        );

        expect(getByText('Something went wrong')).toBeInTheDocument();
    });
});
