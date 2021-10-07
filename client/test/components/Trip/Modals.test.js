import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it, jest} from '@jest/globals';
import FileUploadModal from '../../../src/components/Trip/Itinerary/Modals/FileUploadModal';

describe('FileUploadModal', () => {
    it('renders to screen', () => {
        render(<FileUploadModal />);
    });

    it('does not render when fileUploadOpen is false', () => {
        render(<FileUploadModal fileUploadOpen={false} />);
    });
});