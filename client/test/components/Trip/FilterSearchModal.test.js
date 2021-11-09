import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import FilterSearchModal from '../../../src/components/Trip/Itinerary/Modals/FilterSearchModal';

describe('FileUploadModal', () => {

    let toggleFilterSearch = jest.fn();
    let filterSearchOpen = true;
    beforeEach(() => {
        render(<FilterSearchModal setLimitTypes={()=>jest.fn()} limitTypes={{response:[],request:['rains','down','in']}} limitWhere={{response:[],request:['Africa']}} setLimitWhere={()=>jest.fn()} filterSearchOpen={filterSearchOpen} toggleFilterSearch={toggleFilterSearch} />);
    });
    it('renders when fileUploadOpen is true', () => {
        
    });

});