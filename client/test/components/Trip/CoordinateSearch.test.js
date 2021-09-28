import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import DefaultCoordinateSearch from '../../../src/components/Trip/Search/SearchOptions/CoordinateSearch/DefaultCoordinateSearch';

describe('DefaultCoordinateSearch', () => {
    let latitude = '0';
    let longitude = '0';
    const validLatitude = true;
    const validLongitude = true;
    const setLatitude = () => {latitude=screen.getByPlaceholderText('Latitude').value};
    const setLongitude = () => {longitude=screen.getByPlaceholderText('Longitude').value};
    
    beforeEach(() => {
        render(<DefaultCoordinateSearch 
            latitude={latitude}
            longitude={longitude}
            validLatitude={validLatitude}
            validLongitude={validLongitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
        />);
    });

    it('sets latitude on input change', async () => {
        fireEvent.change(screen.getByPlaceholderText('Latitude'), {target: {value: '40'}});
        expect(latitude).toBe('40');
    });

    it('sets longitude on input change', async () => {
        fireEvent.change(screen.getByPlaceholderText('Longitude'), {target: {value: '40'}});
        expect(longitude).toBe('40');
    });
})