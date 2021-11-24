import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import FileDownloadModal,{downloadFile} from '../../../src/components/Trip/Itinerary/Modals/FileDownload';
import { FileTypeSelector } from '../../../src/components/Trip/Itinerary/Modals/FileDownload';


describe('FileDownloadModal', () => {

    beforeEach(()=>{
        render(<FileDownloadModal fileActionsOpen={true} toggleFileActions={()=>{}} tripName="test" />);
    })

    it('downloadFile JSON', () => {
        
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','application/json',[])
    });

    it('downloadFile CSV', () => {
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','test/csv',[])
    });

    it('downloadFile SVG', () => {
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','image/svg+xml',[])
    });

    it('downloadFile KML', () => {
        //fireEvent.click(screen.getByTestId('download'));
        //let saveToMem = false;
        global.URL.createObjectURL = jest.fn();
        downloadFile('f','application/vnd.google-earth.kml+xml',[])
    });
    
    
});

describe('FileTypeSelector', () => {
    let fileType = "NONE";
    let saveToMem = false;
    beforeEach(()=>{
        let setFileType = (value) => fileType = value
        let setSaveToMem = () => saveToMem = !saveToMem
        render(<FileTypeSelector saveToMem={saveToMem} setSaveToMem={setSaveToMem} fileType={fileType} setFileType={setFileType}/>);
    });

    it('selects JSON', () => {
        fireEvent.click(screen.getByTestId('selectJSON'));
        expect(fileType).toEqual('JSON');
    });

    it('selects CSV', () => {
        fireEvent.click(screen.getByTestId('selectCSV'));
        expect(fileType).toEqual('CSV');
    });

    it('selects SVG', () => {
        fireEvent.click(screen.getByTestId('selectSVG'));
        expect(fileType).toEqual('SVG');
    });

    it('selects KML', () => {
        fireEvent.click(screen.getByTestId('selectKML'));
        expect(fileType).toEqual('KML');
    });

});