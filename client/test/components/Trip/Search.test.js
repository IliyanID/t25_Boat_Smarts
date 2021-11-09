import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { INVALID_REQUEST, MOCK_FIND_RESPONSE} from '../../sharedMocks';
import { LOG } from '../../../src/utils/constants';
import DefaultSearch from '../../../src/components/Trip/Search/SearchOptions/DefaultSearch';
import Search from '../../../src/components/Trip/Search/Search';

describe('Search', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(MOCK_FIND_RESPONSE);
        const setSearchResults = jest.fn();
        render(<Search setLimitTypes={()=>jest.fn()} limitTypes={{response:[],request:['rains','down','in']}} limitWhere={{response:[],request:['Africa']}} setLimitWhere={()=>jest.fn()} setSearchResults={setSearchResults} />);
    });
    it('toggles elements on tab click', () => {
        fireEvent.click(screen.getByText('Random'));
        expect(screen.getByRole('button', {name: /find random places/i})).toBeDefined();
    });

    it('does not change when clicking already active tab', () => {
        fireEvent.click(screen.getAllByRole('listitem')[0]);
        fireEvent.click(screen.getAllByRole('listitem')[0]);
        expect(screen.getByRole('search')).toBeDefined();
    });

});

describe('DefaultSearch', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        fetch.mockResponse(MOCK_FIND_RESPONSE);
    });

    it('sets search results on button click', async () => {
        const setSearchResults = jest.fn();
        render(<DefaultSearch  limitTypes={{response:[],request:['rains','down','in']}} limitWhere={{response:[],request:['Africa']}}  currentURL="" userInput="f" setSearchResults={setSearchResults} activeTab="defaultSearch" />);
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Denver'}});
        fireEvent.click(screen.getByRole('search'));
        /*await waitFor(() => {
            expect(setSearchResults).toHaveBeenCalledTimes(2); //once on input, once on search
        });*/
    });

    it('does not set results when no api response is received', async () => {
        fetch.mockRejectOnce(new Error('Rejected'));
        const setSearchResults = jest.fn();
        render(<DefaultSearch userInput="f" setLimitTypes={()=>jest.fn()} limitTypes={{response:[],request:['rains','down','in']}} limitWhere={{response:[],request:['Africa']}} setLimitWhere={()=>jest.fn()} currentURL="" setSearchResults={setSearchResults} activeTab="defaultSearch" />);
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Denver'}});
        fireEvent.click(screen.getByRole('search'));
        /*await waitFor(() => {
            expect(setSearchResults).toHaveBeenCalledTimes(1); //rejected on input, succes on search
        });
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);*/
    });
});