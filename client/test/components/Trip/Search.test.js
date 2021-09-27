import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import Search from '../../../src/components/Trip/Search/Search.js';
import { act } from 'react-dom/test-utils';

describe('Search', () => {

    it('renders to screen', async () => {
        const {getByRole} = render(<Search />);
        expect(getByRole('textbox').value).toBe('');
        expect(getByRole('search').textContent).toBe('Search');
    });

    it('updates user input on input', () => {
        const {getByRole} = render(<Search />);
        act(() => {
            fireEvent.change(getByRole('textbox'), {target: {value: 'Denver'}});
        });
        expect(getByRole('textbox').value).toBe('Denver');
        act(() => {
            fireEvent.click(getByRole('search'));
        });
    });

});