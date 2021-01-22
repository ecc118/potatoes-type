const getWords = text => {
    const arr = text.split(" ");
    const wordArray = arr.map((word, index) => {
        if (index == arr.length - 1) return word;
        return word += "\xa0";
    });

    return wordArray;
};


const addWords = (container, words) => {
    words.map((word, wordIndex) => {
        const div = document.createElement("div");
        div.setAttribute("class", "word");
        word.split("").map((char, charIndex) => {
            const span = document.createElement("span");
            span.setAttribute("class", "letter");
            span.innerText = char;
            if (charIndex == 0 && wordIndex == 0)
                span.classList.add("cursor");
            div.append(span);
        });
        container.append(div);
    });
}

const checkIfChar = key => {
    const pattern = /(\w){2}/;
    const checkIfSingle = pattern.test(key);
    
    return checkIfSingle;
};

const checkIfCorrect = (correct, word1, word2) => {
    if (word1 == word2) {
        correct++;
    }
    return correct;
}

const getStartTime = () => {
    const startTime = new Date();
    return startTime;
}

const getTimerTime = (startTime) => {
    return new Date() - startTime;
}

const calcWpm = (words, time) => {
    const oneMinInMs = 60000;
    const wpm = (words * oneMinInMs)/time;
    return wpm;
}

export {
    getWords,
    addWords,
    checkIfChar,
    checkIfCorrect,
    getStartTime,
    getTimerTime,
    calcWpm,
}
