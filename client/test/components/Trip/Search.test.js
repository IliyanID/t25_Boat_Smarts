import React from 'react';
import {render} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import Search from '../../../src/components/Trip/Search/Search.js';

describe('Search', () => {

    it('sends valid find request', () => {
        const {getByRole} = render(<Search />);
        
    });

});