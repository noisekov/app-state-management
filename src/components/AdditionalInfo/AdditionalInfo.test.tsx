import { render, fireEvent, screen } from '@testing-library/react';
import AdditionalInfo from './AdditionalInfo';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('AdditionalInfo component', () => {
    const toggleModal = vi.fn();
    const dataForModal = {
        img: 'https://example.com/pokemon-image.png',
        height: 100,
        name: 'Pikachu',
        weight: 50,
        types: ['Electric'],
    };

    it('renders modal with correct data', () => {
        const { getByText, getByAltText } = render(
            <AdditionalInfo
                toggleModal={toggleModal}
                dataForModal={dataForModal}
            />
        );

        expect(getByText('name: Pikachu')).toBeInTheDocument();
        expect(getByText('weight: 50')).toBeInTheDocument();
        expect(getByText('height: 100')).toBeInTheDocument();
        expect(getByText('types: Electric')).toBeInTheDocument();
        expect(getByAltText('pokemon Pikachu')).toBeInTheDocument();
    });

    it('calls toggleModal when clicking close button', () => {
        render(
            <AdditionalInfo
                toggleModal={toggleModal}
                dataForModal={dataForModal}
            />
        );

        const closeButton = screen.getByTestId('additional-info__modal-close');
        fireEvent.click(closeButton);
        expect(toggleModal).toHaveBeenCalledTimes(1);
    });
});
