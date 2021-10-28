import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { INVALID_REQUEST, MOCK_FIND_RESPONSE} from '../../sharedMocks';

import TripName from '../../../src/components/Trip/Itinerary/TripName/TripName'

describe("TripName",()=>{
    let tripName = "My Trip"
    beforeEach(()=>{
        const showMessage = jest.fn();
        let setTripName = (value) => tripName = value
        render(<TripName tripName={tripName} setTripName={setTripName} showMessage={showMessage}/>);
    });

    it('toggleSubmit', () => {
        fireEvent.change(screen.getByTestId('input'), {target: {value: 'Trip2'}});
        fireEvent.click(screen.getByTestId('edit'));
        fireEvent.click(screen.getByTestId('submitName'));
        expect(tripName).toBe("Trip2");
    });

    it('toggleCanel', () => {
        fireEvent.change(screen.getByTestId('input'), {target: {value: 'Trip3'}});
        fireEvent.click(screen.getByTestId('edit'));
        fireEvent.click(screen.getByTestId('cancelName'));
        expect(tripName).toBe("Trip2");
    });
})