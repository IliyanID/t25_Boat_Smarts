import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it, jest} from '@jest/globals';
import FileUploadModal from '../../../src/components/Trip/Itinerary/Modals/FileUploadModal';
import FileDownloadModal from '../../../src/components/Trip/Itinerary/Modals/FileDownloadModal';

describe('FileUploadModal', () => {
    it('renders to screen', () => {
        render(<FileUploadModal />);
    });

    it('does not render when fileUploadOpen is false', () => {
        render(<FileUploadModal fileUploadOpen={false} />);
    });
});

describe('FileDownloadModal', () => {
    it('renders to screen', () => {
        render(<FileDownloadModal />);
    });

    it('does not render when fileUploadOpen is false', () => {
        render(<FileDownloadModal fileUploadOpen={false} />);
    });
});