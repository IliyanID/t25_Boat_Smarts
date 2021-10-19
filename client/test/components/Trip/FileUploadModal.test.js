import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import FileUploadModal from '../../../src/components/Trip/Itinerary/Modals/FileUploadModal';
import { MOCK_FILE_INFO } from '../../sharedMocks';

describe('FileUploadModal', () => {
    const fs = jest.mock('fs');
    fs.setMock(MOCK_FILE_INFO);
    const setPlaces = jest.fn();
    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(MOCK_FILE_INFO["testTrip.json"]);
        render(<FileUploadModal fileUploadOpen={true} setPlaces={setPlaces} />);
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
    
});