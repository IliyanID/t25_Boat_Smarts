import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import FileDownloadModal,{downloadFile} from '../../../src/components/Trip/Itinerary/Modals/FileDownload';


describe('FileUploadModal', () => {



    it('downloadFile JSON', () => {
        render(<FileDownloadModal fileDownloadOpen={true} toggleFileDownloadOpen={()=>{}} tripName="test" />);
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','application/json',[])
    });

    it('downloadFile JSON', () => {
        render(<FileDownloadModal fileDownloadOpen={true} toggleFileDownloadOpen={()=>{}} tripName="test" />);
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','test/csv',[])
    });

    
    
});