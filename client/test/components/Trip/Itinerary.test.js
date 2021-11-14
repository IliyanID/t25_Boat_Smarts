import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { MOCK_PLACES, MOCK_DISTANCES } from "../../sharedMocks";
import Itinerary from '../../../src/components/Trip/Itinerary/Itinerary.js';
import DistanceInfo from '../../../src/components/Trip/Itinerary/Body/TableRow/DistanceInfo/DistanceInfo';

describe('Itinerary', () => {
    beforeEach(() => {
        render(<Itinerary distances={{distances:MOCK_DISTANCES}} places={MOCK_PLACES} placeActions={{append: jest.fn()}} />);
    });

    it('renders a cell with given place expected', () => {
        expect(screen.getByRole('cell', { name: /40.0/i }).textContent)
            .toContain('40.00, 50.00');

            render(<Itinerary distances={MOCK_DISTANCES} places={MOCK_PLACES} placeActions={{append: jest.fn()}} />);
    });

    it('renders the name attribute', () => {
        screen.getByRole('cell', { name: /Place A/i });
    });



    it('Distance Info', () => {
        render(<DistanceInfo index={0} cumalitiveDistances={[{total:50,distance:50}]} distances={{distances:[50,60]}} />);
        render(<DistanceInfo index={0} cumalitiveDistances={[{total:1,distance:1}]} distances={{distances:[1]}} />);
    });
});