import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import DegreesMinutesSeconds from '../../../src/components/Trip/Search/SearchOptions/CoordinateSearch/DegreesMinutesSeconds';
import { act } from 'react-dom/test-utils';

describe('DegreesMinutesSeconds', () => {
    const setLatitude = jest.fn();
    const setLongitude = jest.fn();

    it('renders three inputs', () => {
        render(<DegreesMinutesSeconds setLatitude={setLatitude} setLongitude={setLongitude} />)
        expect(screen.getAllByRole('textbox').length).toEqual(3);
    });
    
    it('sets latitude when input changes', () => {
        render(<DegreesMinutesSeconds coordType="Latitude" setLatitude={setLatitude} setLongitude={setLongitude} />);
        fireEvent.change(screen.getByPlaceholderText('Degrees'), {target: {value: '39'}});
        expect(setLatitude).toBeCalled();
    });

    it('sets longitude when input changes', () => {
        render(<DegreesMinutesSeconds coordType="Longitude" setLatitude={setLatitude} setLongitude={setLongitude} />);
        fireEvent.change(screen.getByPlaceholderText('Minutes'), {target: {value: '39'}});
        expect(setLongitude).toBeCalled();
    });
    
    it('changes Seconds on input change', () => {
        render(<DegreesMinutesSeconds setLatitude={setLatitude} setLongitude={setLongitude} />);
        fireEvent.change(screen.getByPlaceholderText('Seconds'), {target: {value: '39'}});
        expect(screen.getByPlaceholderText('Seconds').value).toBe('39');
    })
});