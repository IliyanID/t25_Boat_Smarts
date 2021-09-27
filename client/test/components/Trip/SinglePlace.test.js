import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it} from '@jest/globals';
import SinglePlace from '../../../src/components/Trip/Search/SinglePlace.js';
import {MOCK_RESULT} from '../../sharedMocks.js';

describe('Single Place', () => {

    beforeEach(() => {
        render(<SinglePlace place={MOCK_RESULT}/>);
    });
    it('renders to screen', () => {
        expect(screen.getByRole('heading').textContent).toBe('Test Location');
    });

    it('toggles details on click', () => {
        const collapse = screen.getByTestId('place-collapse');
        expect(collapse.classList.contains('show')).toBe(false);
        fireEvent.click(screen.getByRole('heading'));
        waitFor(() => {
            expect(collapse.classList.contains('show')).toBe(true);
        });
    });

});