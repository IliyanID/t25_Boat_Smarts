import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import {describe, expect, it, jest } from '@jest/globals';
import {toggle, ItineraryActionsDropdown, PlaceActionsDropdown } from '../../../src/components/Trip/Itinerary/actions';


describe('Render ItineraryActionsDropdown', () => {
    const placeActions = {
        move : ()=>{},
        removeAtIndex : (index)=>{},
        selectIndex : (index)=>{},
        reverse : ()=>{},
        removeAll : ()=>{}

    }
    const setCenterView = () =>{}
    let centerView = false;

    const showMessage=()=>{}
    it('sets coordinates on input change', async () => {
        render(<ItineraryActionsDropdown showMessage={showMessage} centerView={centerView} setCenterView={setCenterView} index={2} placeActions={placeActions}/>);
    });

    it('Render PlaceActionsDropdown 2', async () => {
        render(<PlaceActionsDropdown showMessage={showMessage} centerView={centerView} setCenterView={setCenterView} index={2} placeActions={placeActions}/>);
        fireEvent.click(screen.getByTestId('home-button-2'));
        fireEvent.click(screen.getByTestId('delete-button-2'));
        fireEvent.click(screen.getByTestId('center-button-2'));
    });

    it('Render PlaceActionsDropdown 0', async () => {
        render(<PlaceActionsDropdown showMessage={showMessage} centerView={centerView} setCenterView={setCenterView} index={0} placeActions={placeActions}/>);
        fireEvent.click(screen.getByTestId('delete-button-0'));
        fireEvent.click(screen.getByTestId('center-button-0'));
    });

    it('toggle', async () => {
        let index = 0;
        let toolTip = [false]
        let setToolTips = (i)=>{}
        toggle(index,toolTip,setToolTips)
    });

    it('toggle', async () => {
        let index = 0;
        let toolTip = [false]
        let setToolTips = (i)=>{}
        toggle(index,toolTip,setToolTips)
    });



})