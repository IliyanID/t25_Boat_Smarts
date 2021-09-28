import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MOCK_FIND_RESPONSE} from '../../sharedMocks';
import RandomSearch from '../../../src/components/Trip/Search/SearchOptions/RandomSearch';

describe('RandomSearch', () => {
    const setSearchResults = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();
        fetch.mockResponse(MOCK_FIND_RESPONSE);
        render(<RandomSearch currentURL="" setSearchResults={setSearchResults} activeTab="randomSearch" />);
    });


    it('sets results on button click', async () => {
        fireEvent.click(screen.getByText('Find Random Places'));
        await waitFor(() => {
            expect(setSearchResults).toHaveBeenCalled();
        });
    });

    it("does not set search results when no api response is received", () => {
        fetch.mockRejectOnce(new Error('Rejected'));
        fireEvent.click(screen.getByText('Find Random Places'));
        expect(setSearchResults).toHaveBeenCalledTimes(0);
    })
});