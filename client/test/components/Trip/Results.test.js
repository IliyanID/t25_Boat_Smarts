import React from 'react';
import {render, screen,fireEvent} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import Results from '../../../src/components/Trip/Results/Results.js';
import { MOCK_PLACES } from '../../sharedMocks.js';

describe('Results', () => {

    const MOCK_RESULTS = {
        places: MOCK_PLACES,
        placesFound: 2
    }

    it('renders to screen', () => {
        render(<Results searchResults={MOCK_RESULTS} />);
    });

});