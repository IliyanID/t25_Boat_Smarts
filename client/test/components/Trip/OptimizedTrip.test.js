import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OptimizedTrip from '../../../src/components/Trip/OptimizedTrip/OptimizedTrip';
import { expect } from '@jest/globals';

describe('OptimizedTrip', () => {
    let previewTripFocus = true;
    let setPlaces = jest.fn();
    beforeEach(() => {
        const togglePreviewTripFocus = () => {previewTripFocus=!previewTripFocus};
        render(<OptimizedTrip  previewTripFocus={previewTripFocus} togglePreviewTripFocus={togglePreviewTripFocus} setAllPlaces={setPlaces} origionalPlaces={[]}/>);
    });

    afterEach(() => {
        previewTripFocus = true;
        setPlaces = jest.fn();
    });

    it('Render OptimizedTrip', async () => {
        expect(screen.getByTestId('blocker').classList.length).toEqual(0)
        screen.getByTestId('ConfirmTrip');
        screen.getByTestId('DenyTrip');
    });

    it('Test Confirm Trip', async () => {
        fireEvent.click(screen.getByTestId('ConfirmTrip'));
        expect(previewTripFocus).toEqual(false)
        expect(setPlaces).toHaveBeenCalledTimes(0);
    });

    it('Test Deny Trip', async () => {
        fireEvent.click(screen.getByTestId('DenyTrip'));
        expect(previewTripFocus).toEqual(false)
        expect(setPlaces).toHaveBeenCalledTimes(1);
        previewTripFocus = !previewTripFocus
    });

});