import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it, jest} from '@jest/globals';
import DefaultSearch from '../../../src/components/Trip/Search/SearchOptions/DefaultSearch';
import { act } from 'react-dom/test-utils';
import { MOCK_RESULT_POSITIVE } from '../../sharedMocks';

describe('Default Search', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(MOCK_RESULT_POSITIVE);
        render(<DefaultSearch  limitTypes={{request:['rains','down','in']}} limitWhere={{request:['Africa']}} setSearchResults={jest.fn()} />)
    });

    it('renders to screen', async () => {
        expect(screen.getByRole('textbox').value).toBe('');
        //expect(screen.getByRole('search').textContent).toBe('Search');
    });

    it('updates user input on input', () => {
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Denver'}});
        expect(screen.getByRole('textbox').value).toBe('Denver');
    });

    it('sets search results on button click', () => {
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Denver'}});
        act(() => {
            fireEvent.click(screen.getByRole('search'));
        });
    })

    it('clears user input on clear', () => {
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Denver'}});
        act(() => {
            fireEvent.click(screen.getByRole('clear'));
        });
        expect(screen.getByRole('textbox').value).toBe('');
    });

});