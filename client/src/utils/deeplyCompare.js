export const deeplyCompareObjs = (obj1, obj2) =>{
    if(obj1.le)
    Object.keys(obj1).forEach(key1=>{
        let equal = false;
        Object.keys(obj2).forEach(key2=>{
            if(obj1[key1] === obj2[key2])
                equal = true
        })
        if(!equal)
            return equal
    })
    return true;
}

export const deeplyCompareArray = (arr1,arr2) =>{
    if(arr1.length !== arr2.length)
        return false
    arr1.forEach(item1=>{
        let equal = false;
        arr2.forEach(item2=>{
            if(deeplyCompareObjs(item1,item2))
                equal = true
        })
        if(!equal)
            return false
    })
    return true
}