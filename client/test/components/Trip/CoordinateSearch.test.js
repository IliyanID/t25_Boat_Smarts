import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import DefaultCoordinateSearch from '../../../src/components/Trip/Search/SearchOptions/CoordinateSearch/DefaultCoordinateSearch';
import CoordinateSearch from '../../../src/components/Trip/Search/SearchOptions/CoordinateSearch/CoordinateSearch';

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

describe('CoordinateSearch', () => {
    const showMessage = jest.fn();
    beforeEach(() => {
        render(<CoordinateSearch showMessage={showMessage} />);
    })
    it('changes input options on select change', () => {
        fireEvent.change(screen.getByRole('combobox'), {target: {value: 'dms'}});
        expect(screen.getAllByRole('textbox').length).toBe(6);
    });

    it('handles invalid latitude', () => {
        fireEvent.change(screen.getByPlaceholderText('Latitude'), {target: {value: '3000'}});
        expect(screen.getByPlaceholderText('Latitude').classList.contains('is-invalid')).toBeTruthy();
        fireEvent.click(screen.getByText('Find'));
        expect(showMessage).toHaveBeenCalled();
    });

    it('handles invalid longitude', () => {
        fireEvent.change(screen.getByPlaceholderText('Longitude'), {target: {value: '-1000'}});
        expect(screen.getByPlaceholderText('Longitude').classList.contains('is-invalid')).toBeTruthy();
        fireEvent.click(screen.getByText('Find'));
        expect(showMessage).toHaveBeenCalled();
    });
})