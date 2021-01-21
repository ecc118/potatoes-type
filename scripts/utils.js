const getWords = text => {
    const arr = text.split(" ");
    const wordArray = arr.map((word, index) => {
        if (index == arr.length - 1) return word;
        return word += "\xa0";
    });

    return wordArray;
};

const checkIfChar = key => {
    const pattern = /(\w){2}/;
    const checkIfSingle = pattern.test(key);
    
    return checkIfSingle;
};

export {
    getWords,
    checkIfChar,
}
