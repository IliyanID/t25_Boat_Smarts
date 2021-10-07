import React from 'react';
import {render, screen,fireEvent} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import Results from '../../../src/components/Trip/Results/Results.js';
import { MOCK_PLACES } from '../../sharedMocks.js';
import { act } from 'react-dom/test-utils';

describe('Results', () => {

    const MOCK_RESULTS = {
        places: MOCK_PLACES,
        found: 3
    }

    it('renders to screen', () => {
        act(() => {
            render(<Results searchResults={MOCK_RESULTS} />);
        });
        expect(screen.getByTestId('results-list').childNodes.length).toEqual(4);
    });

    it('does not list total results when placesFound is undefined', () => {
        act(() => {
            render(<Results searchResults={{places: MOCK_PLACES}} />);
        });
        expect(screen.getByTestId('results-list').childNodes.length).toEqual(3);
    });

    it('does not return a list when "places" is undefined', () => {
        act(() => {
            render(<Results searchResults={{found: 3}} />);
        });
        expect(screen.getByTestId('results-list').childNodes.length).toEqual(1);
    })

    
});
