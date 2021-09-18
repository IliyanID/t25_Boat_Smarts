import '../../jestConfig/enzyme.config.js';

import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import Search from '../../../src/components/Trip/Search/Search.js';

describe('Search', () => {

    it('renders to screen', async () => {
        const {getByRole} = render(<Search />);
        expect(getByRole('textbox').value).toBe('');
        expect(getByRole('search').textContent).toBe('Search');
    });

    it('updates user input on input', () => {
        const {getByRole} = render(<Search />);
        fireEvent.change(getByRole('textbox'), {target: {value: 'Denver'}});
        expect(getByRole('textbox').value).toBe('Denver');
        fireEvent.click(getByRole('search'));
    });

});