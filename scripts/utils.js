const getWords = (text) => {
    const arr = text.split(" ");
    const wordArray = arr.map((word, index) => {
        if (index == arr.length - 1) return { word, correct: false };
        word += "\xa0";
        return {
            word,
            correct: false,
        };
    });

    return wordArray;
};

const addWords = (container, words) => {
    words.map((word, wordIndex) => {
        const div = document.createElement("div");
        div.setAttribute("class", "word");
        word.word.split("").map((char, charIndex) => {
            const span = document.createElement("span");
            span.setAttribute("class", "letter");
            span.innerText = char;
            if (charIndex == 0 && wordIndex == 0) span.classList.add("cursor");
            div.append(span);
        });
        container.append(div);
    });
};

const checkIfChar = (key) => {
    const pattern = /(\w){2}/;
    const checkIfSingle = pattern.test(key);

    return checkIfSingle;
};

const checkIfCorrect = (correctWords, word1, word2) => {
    let correct = false;
    if (word1 === word2) {
        correctWords++;
        correct = true;
    }
    return { correctWords, correct };
};

const getStartTime = () => {
    const startTime = new Date();
    return startTime;
};

const getTimerTime = (startTime) => {
    return new Date() - startTime;
};

const calcWpm = (words, time) => {
    const oneMinInMs = 60000;
    const wpm = (words * oneMinInMs) / time;
    return wpm;
};

const chagePotatoeState = (wpm, potatoe) => {
    if (wpm <= 40) {
        potatoe.setAttribute("class", "potatoe potatoe-slow");
    }
    if (wpm > 40 && wpm < 80) {
        potatoe.setAttribute("class", "potatoe potatoe-mod");
    }
    if (wpm >= 80) {
        potatoe.setAttribute("class", "potatoe potatoe-fast");
    }
};

export {
    getWords,
    addWords,
    checkIfChar,
    checkIfCorrect,
    getStartTime,
    getTimerTime,
    calcWpm,
    chagePotatoeState,
};
