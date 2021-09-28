import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { INVALID_REQUEST, MOCK_FIND_RESPONSE} from '../../sharedMocks';
import { LOG } from '../../../src/utils/constants';
import DefaultSearch from '../../../src/components/Trip/Search/SearchOptions/DefaultSearch';

describe('DefaultSearch', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        fetch.mockResponse(MOCK_FIND_RESPONSE);
    });

    it('sets search results on button click', async () => {
        const setSearchResults = jest.fn();
        render(<DefaultSearch currentURL="" setSearchResults={setSearchResults} activeTab="defaultSearch" />);
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Denver'}});
        fireEvent.click(screen.getByRole('search'));
        await waitFor(() => {
            expect(setSearchResults).toHaveBeenCalled();
        });
    });

    it('does not set results when no api response is received', async () => {
        fetch.mockRejectOnce(new Error('Rejected'));
        const setSearchResults = jest.fn();
        render(<DefaultSearch currentURL="" setSearchResults={setSearchResults} activeTab="defaultSearch" />);
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Denver'}});
        fireEvent.click(screen.getByRole('search'));
        await waitFor(() => {
            expect(setSearchResults).toHaveBeenCalledTimes(2);
        });
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
});