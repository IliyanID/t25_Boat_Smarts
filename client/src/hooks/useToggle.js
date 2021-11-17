import { useState } from 'react';

export function useToggle(starting) {
    const [toggled, setToggled] = useState(starting);

    function toggle() {
        setToggled(!toggled);
    }

    return [toggled, toggle];
}

export function useMultiToggle(item,size){
    let starterArr = new Array(size).fill(item)
    const [toggle,setToggled] = useState(starterArr)
    const toggleFunc = (index) => {
        let temp = [...toggle];
        temp[index] = !temp[index]
        setToggled(temp)
    }
    return [toggle,toggleFunc]
}