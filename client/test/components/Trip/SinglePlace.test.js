import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it} from '@jest/globals';
import SinglePlace from '../../../src/components/Trip/Results/SinglePlace.js';
import {MOCK_RESULT_POSITIVE, MOCK_RESULT_NEGATIVE} from '../../sharedMocks.js';

describe('Single Place', () => {
    const placeActions = {
        append: jest.fn()
    };

    it('renders to screen', () => {
        render(<SinglePlace place={MOCK_RESULT_POSITIVE} placeActions={placeActions} />);
        expect(screen.getByRole('heading').textContent).toBe('Test Location');
    });

    it('toggles details on click', () => {
        render(<SinglePlace place={MOCK_RESULT_POSITIVE} placeActions={placeActions} />);
        const collapse = screen.getByTestId('place-collapse');
        expect(collapse.classList.contains('show')).toBe(false);
        fireEvent.click(screen.getByRole('heading'));
        waitFor(() => {
            expect(collapse.classList.contains('show')).toBe(true);
        });
    });

    it('adds itself to trip on button click', () => {
        render(<SinglePlace place={MOCK_RESULT_POSITIVE} placeActions={placeActions} />);
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(placeActions.append).toHaveBeenCalledTimes(1);
    });

    it('displays degrees south and west correctly', () => {
        render(<SinglePlace place={MOCK_RESULT_NEGATIVE} placeActions={placeActions} />);
    });
});