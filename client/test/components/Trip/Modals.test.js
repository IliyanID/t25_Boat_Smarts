import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it, jest} from '@jest/globals';
import FileUploadModal from '../../../src/components/Trip/Itinerary/Modals/FileUploadModal';
import FileDownloadModal, {buildFileText, addExtension, downloadFile} from '../../../src/components/Trip/Itinerary/Modals/FileDownloadModal';
import {buildTripJSON, buildTripCSV} from "../../../src/utils/fileBuilder";

jest.mock('../../../src/utils/fileBuilder', ()=>({
    buildTripJSON: ()=>'mock JSON',
    buildTripCSV: ()=>'mock CSV'
}));

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

    it('creates correct JSON file names', () => {
        expect(addExtension("my trip", "application/json")).toEqual("my_trip.json");
    });

    it('creates correct CSV file names', () => {
        expect(addExtension("my trip", "text/csv")).toEqual("my_trip.csv");
    });

    it('uses buildTripJSON to build JSON Text', () => {
        expect(buildFileText("application/json", {})).toEqual("mock JSON");
    });

    it('uses buildTripCSV to build CSV Text', () => {
        expect(buildFileText("text/csv", {})).toEqual("mock CSV");
    });

});