import { useState } from 'react';
import { placeToLatLng } from '../utils/transformers';
import { reverseGeocode } from '../utils/reverseGeocode';
import { LOG } from '../utils/constants';
import { arrayMove } from 'react-movable'

export function usePlaces() {
    const [previousPlaces, setPreviousPlaces] = useState([]);
    const [places, setPlaces] = useState([]);
    const setAllPlaces =(newPlaces) =>{
        setPreviousPlaces([...newPlaces])
        setPlaces([...newPlaces])
    }

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const context = { places, setPlaces, selectedIndex, setSelectedIndex, previousPlaces, setPreviousPlaces };

    const placeActions = {
        append: async (place) => append(place, context),
        removeAtIndex: (index) => removeAtIndex(index, context),
        removeAll: () => removeAll(context),
        selectIndex: (index) => selectIndex(index, context),
        move: (oldIndex,newIndex) => moveItem(oldIndex,newIndex,context),
        reverse: () => reverse(context)
    };

    return { setAllPlaces, previousPlaces, places, setPlaces, selectedIndex, setSelectedIndex, placeActions };
}

async function append(place, context) {
    const { places, setPlaces, setSelectedIndex, setPreviousPlaces } = context;
    setPreviousPlaces([...places]);
    const newPlaces = [...places];

    let fullPlace;
    if (!('name' in place) || place.name === '' ){
        fullPlace = await reverseGeocode(placeToLatLng(place));
    } else {
        fullPlace = {...placeToLatLng(place), name: place.name}
    }
    
    newPlaces.push(fullPlace);

    setSelectedIndex(newPlaces.length - 1);
    setPlaces(newPlaces);
    
}

function removeAtIndex(index, context) {
    const { places, setPlaces, selectedIndex, setSelectedIndex, setPreviousPlaces } = context;

    if (index < 0 || index >= places.length) {
        LOG.error(`Attempted to remove index ${index} in places list of size ${places.length}.`);
        return;
    }
    setPreviousPlaces([...places])
    const newPlaces = places.filter((place, i) => index !== i);
    setPlaces(newPlaces);

    if (newPlaces.length === 0) {
        setSelectedIndex(-1);
    } else if (selectedIndex >= index && selectedIndex !== 0) {
        setSelectedIndex(selectedIndex - 1);
    }
}

function removeAll(context) {
    const { setPlaces, setSelectedIndex, setPreviousPlaces } = context;
    setPreviousPlaces([]);
    setPlaces([]);
    setSelectedIndex(-1);
}

function selectIndex(index, context) {
    const { places, setSelectedIndex } = context;

    if (index < -1 || index >= places.length) {
        LOG.error(`Attempted to select index ${index} in places list of size ${places.length}.`);
        setSelectedIndex(-1);
        return;
    }
    setSelectedIndex(index);
}

function moveItem(oldIndex,newIndex,context){
    const { places, setPlaces, setSelectedIndex,setPreviousPlaces } = context;
    setPlaces(arrayMove(places,oldIndex,newIndex))
    setSelectedIndex(newIndex)
}

function reverse (context){
    const { places, setPlaces, setSelectedIndex,setPreviousPlaces } = context;
    let temp = [...places]
    temp.reverse();
    temp = arrayMove(temp,temp.length - 1,0);
    setPlaces(temp)
    setPreviousPlaces(temp)
    setSelectedIndex(-1)
}