import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import FileUploadModal, {convertPlace,csvToJson} from '../../../src/components/Trip/Itinerary/Modals/FileUploadModal';
import { MOCK_FILE_INFO } from '../../sharedMocks';

describe('FileUploadModal', () => {
    const setPlaces = jest.fn();
    const mockPlace = {latitude: "40.570", longitude: "-105.085"};
    const mockPlaceWithName = {name: 'CSU Oval', latitude: "40.570", longitude: "-105.085"};
    const mockPlaceResponse = {
        lat: 40.57,
        lng: -105.085,
        name: 'Unknown'
    };
    const mockPlaceWithNameResponse = {
        lat: 40.57,
        lng: -105.085,
        name: 'CSU Oval'
    };

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(MOCK_FILE_INFO["testTrip.json"]);
        render(<FileUploadModal fileUploadOpen={true} setAllPlaces={setPlaces} />);
    });
    it('renders when fileUploadOpen is true', () => {
        expect(screen.getByRole('input')).toBeDefined();
    });
    it('calls setPlaces on save', async () => {
        fireEvent.click(screen.getByText('Save'));
        waitFor(() => {
            expect(setPlaces).toHaveBeenCalledTimes(1);
        });
    });
    it('converts places with no name', () => {
        expect(convertPlace(mockPlace)).toEqual(mockPlaceResponse);
    });
    it('converts places with a name', () => {
        expect(convertPlace(mockPlaceWithName)).toEqual(mockPlaceWithNameResponse);
    });
    it('csvtojson', () => {
        csvToJson(' \n , \n')
    });
    
});