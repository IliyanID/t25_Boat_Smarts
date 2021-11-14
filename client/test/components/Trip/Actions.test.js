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