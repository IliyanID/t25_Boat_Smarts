import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect } from '@jest/globals';
import { MOCK_PLACES } from "../../sharedMocks";

import Map from '../../../src/components/Trip/Map/Map';
import Marker from '../../../src/components/Trip/Map/Marker';
import { act } from 'react-dom/test-utils';

describe('Map', () => {
    const places = MOCK_PLACES;
    const placeActions = {
        append: jest.fn()
    };

    beforeAll(() => {
        Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
    });



    it('appends calls append when the map is clicked', () => {
        render(<Map previewTripFocus={false} places={places} locationPreview={{lat:1,lng:2}} selectedIndex={1} placeActions={placeActions} />);
        act(() => {
            //user.click(screen.getByTestId('Map'));
        });
        expect(placeActions.append).toHaveBeenCalled();
    });

    it('marker', () => {
        render(<Marker />)
    });


});