export const storageTest = function (){
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
};

export const setStorage = (key, obj) => {
    if(storageTest() === true) {
        let data = JSON.stringify(obj);
        console.log(data);
        localStorage.setItem(key, data);
    }
}

export const getStorage = (key) => {
    if(storageTest() === true) {
        let getAppData = localStorage.getItem(key);
        let data = JSON.parse(getAppData);
        return data;        
    }
}