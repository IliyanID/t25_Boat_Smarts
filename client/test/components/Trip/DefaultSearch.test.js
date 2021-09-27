import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import DefaultSearch from '../../../src/components/Trip/Search/SearchOptions/DefaultSearch';
import { act } from 'react-dom/test-utils';

describe('Default Search', () => {

    it('renders to screen', async () => {
        const {getByRole} = render(<DefaultSearch />);
        expect(getByRole('textbox').value).toBe('');
        expect(getByRole('search').textContent).toBe('Search');
    });

    it('updates user input on input', () => {
        const {getByRole} = render(<DefaultSearch />);
        fireEvent.change(getByRole('textbox'), {target: {value: 'Denver'}});
        expect(getByRole('textbox').value).toBe('Denver');
        act(() => {
            fireEvent.click(getByRole('search'));
        });
    });

});