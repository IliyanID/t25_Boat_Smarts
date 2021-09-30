import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import CoordinateSearch from '../../../src/components/Trip/Search/SearchOptions/CoordinateSearch';
import {MOCK_FIND_RESPONSE} from '../../sharedMocks';

describe('CoordinateSearch', () => {
    const placeActions = {
        append: jest.fn()
    }
    const setLocationPreview = jest.fn();
    const showMessage = jest.fn();

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(MOCK_FIND_RESPONSE);
        render(<CoordinateSearch placeActions={placeActions} setLocationPreview={setLocationPreview} showMessage={showMessage} />);
    });

    it('sets coordinates on input change', async () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '40 -105' } });
        expect(screen.getByRole('textbox').value).toBe('40 -105');
    });

    it('finds location on button click', async () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '40 -105' } });
        fireEvent.click(screen.getByText('Find'));
        await waitFor(() => {
            expect(setLocationPreview).toHaveBeenCalled();
        });
    });

    it('adds location to trip on button click', async () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '40 -105' } });
        fireEvent.click(screen.getByText('Add to Trip'));
        expect(placeActions.append).toHaveBeenCalled();
    });

    it('shows message on invalid inputs', () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '70000' } });
        fireEvent.click(screen.getByText('Find'));
        fireEvent.click(screen.getByText('Add to Trip'));
        expect(showMessage).toHaveBeenCalled();
    })

})