import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import CoordinateSearch from '../../../src/components/Trip/Search/SearchOptions/CoordinateSearch';
import {LOG} from '../../../src/utils/constants';
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
    });

    afterEach(cleanup);

    it('sets coordinates on input change', async () => {
        render(<CoordinateSearch placeActions={placeActions} setLocationPreview={setLocationPreview} showMessage={showMessage} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '40 -105' } });
        expect(screen.getByRole('textbox').value).toBe('40 -105');
    });

    it('finds location on button click', async () => {
        render(<CoordinateSearch placeActions={placeActions} setLocationPreview={setLocationPreview} showMessage={showMessage} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '40 -105' } });
        fireEvent.click(screen.getByText('Find'));
        await waitFor(() => {
            expect(setLocationPreview).toHaveBeenCalled();
        });
    });

    it('adds location to trip on button click', async () => {
        render(<CoordinateSearch placeActions={placeActions} setLocationPreview={setLocationPreview} showMessage={showMessage} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '40 -105' } });
        fireEvent.click(screen.getByText('Add to Trip'));
        expect(placeActions.append).toHaveBeenCalled();
    });

    it('shows message on invalid inputs', () => {
        render(<CoordinateSearch placeActions={placeActions} setLocationPreview={setLocationPreview} showMessage={showMessage} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '70000' } });
        fireEvent.click(screen.getByText('Find'));
        fireEvent.click(screen.getByText('Add to Trip'));
        expect(showMessage).toHaveBeenCalled();
    });

    it('logs error when showMessage is undefined', () => {
        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        render(<CoordinateSearch placeActions={placeActions} setLocationPreview={setLocationPreview} showMessage={null} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '70000' } });
        fireEvent.click(screen.getByText('Find'));
    })

})