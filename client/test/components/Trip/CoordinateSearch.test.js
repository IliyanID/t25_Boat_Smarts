import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import CoordinateSearch from '../../../src/components/Trip/Search/SearchOptions/CoordinateSearch/CoordinateSearch';

describe('CoordinateSearch', () => {
    
    beforeEach(() => {
        render(<CoordinateSearch />);
    });

    it('sets latitude on input change', async () => {
        
    });

    it('sets longitude on input change', async () => {
        
    });
})