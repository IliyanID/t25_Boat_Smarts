import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import FileDownloadModal,{downloadFile} from '../../../src/components/Trip/Itinerary/Modals/FileDownload';


describe('FileUploadModal', () => {

    beforeEach(()=>{
        render(<FileDownloadModal fileActionsOpen={true} toggleFileActions={()=>{}} tripName="test" />);
    })

    it('downloadFile JSON', () => {
        
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','application/json',[])
    });

    it('downloadFile JSON', () => {
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','test/csv',[])
    });

    
    
});