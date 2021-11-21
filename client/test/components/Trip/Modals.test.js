import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {describe, expect, it, jest} from '@jest/globals';
import FileUploadModal, { csvToJson} from '../../../src/components/Trip/Itinerary/Modals/FileUpload';
import FileDownloadModal, {buildFileText, addExtension, downloadFile} from '../../../src/components/Trip/Itinerary/Modals/FileDownload';
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
        render(<FileUploadModal fileActionsOpen={false} />);
    });

    it('save',async () => {
        let setTripName = jest.fn()
        render(<FileUploadModal setTripName={setTripName} fileUploadOpen={true} />);
        fireEvent.click(screen.getByRole('saveUpload'));
        await waitFor(() => {
            expect(setTripName).toHaveBeenCalledTimes(0); //once on input, once on search
        });
    });

    it('validateJSON',()=>{  
        render(<FileUploadModal fileActionsOpen={true} />);
        const file = new File(['{"earthRadius": 3959,"units": "miles","places": []}'], 'b_b.json', { type: 'application/json' })

        const inputEl = screen.getByRole('input')
        Object.defineProperty(inputEl, 'files', {
            value: [file]
          })
        
          //fireEvent.change(inputEl)
          fireEvent.click(screen.getByRole('saveUpload'));
    });

    it('validateCSV',()=>{  
        render(<FileUploadModal fileActionsOpen={true} />);
        let text = '"earthRadius","units","latitude","longitude", "name"\
        3959,"miles","40.525178204352564","-105.06564549596901","4597, Boardwalk Drive, Fairway Estates, Fort Collins, Larimer County, Colorado, 80525, United States"'
        const file = new File([text], 'b_b.json', { type: 'text/csv' })

        const inputEl = screen.getByRole('input')
        Object.defineProperty(inputEl, 'files', {
            value: [file]
          })
        
          //fireEvent.change(inputEl)
          ;

          csvToJson(text)
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