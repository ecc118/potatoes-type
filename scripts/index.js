import Text from "./text.js";
import { getWords, checkIfChar } from "./utils.js";
import * as elements from "./elements.js";

function addWords(words) {
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
        elements.container.append(div);
    });
}


const checkIfCorrect = (correct, word1, word2) => {
    if (word1 == word2) {
        correct++;
    }
    return correct;
}

const status = {
    currentWord: 0,
    currentChar: 0,
    currentWordString: "",
    correctWords: 0,
    startTime: 0,
    timer: undefined,
    currentTime: 0,
    finished: false,
};

const startTimer = () => {
    const startTime = new Date();
    status.startTime = startTime;
    const timer = setInterval(() => {
        status.currentTime = getTimerTime();
    }, 1);

    return timer;
}

const getTimerTime = () => {
    return new Date() - status.startTime;
}

const calcWpm = (words, time) => {
    const oneMinInMs = 60000;
    const wpm = (words * oneMinInMs)/time;
    return wpm;
}

const words = getWords(Text);

addWords(words);

document.addEventListener("keydown", e => {
    if (e.key == "/") e.preventDefault();

    if (status.finished) {
        console.log("finished");
        return;
    }

    if (status.startTime == 0) status.timer = startTimer();

    const currentChar = elements.getCharSpan(
        elements.container,
        status.currentWord,
        status.currentChar
    );

    if (!checkIfChar(e.key)) {
        if (e.key == currentChar.innerText ||
            (e.key.charCodeAt(0) == 32 &&
            currentChar.innerText.charCodeAt(0) == 160)) {

            status.currentWordString = status.currentWordString +
                words[status.currentWord][status.currentChar];
            currentChar.classList.add("correct");
        }
        else {
            currentChar.classList.add("incorrect");
        }

        currentChar.classList.remove("cursor");
    
        let secondChar;
        if (words[status.currentWord].length - 1 == status.currentChar) {
            status.correctWords = checkIfCorrect(status.correctWords,
                                                status.currentWordString,
                                                words[status.currentWord]);
            elements.correctWordCount.innerText = status.correctWords;
            status.currentChar = 0;
            status.currentWord++;

            const wpm = Math.floor(calcWpm(status.correctWords, status.currentTime));
            elements.wpmCount.innerText = wpm

            status.currentWordString = "";
            if (status.currentWord < words.length)
                secondChar = elements.getCharSpan(
                    elements.container,
                    status.currentWord,
                    status.currentChar
                );
            else {
                status.finished = true;
                clearInterval(status.timer);
            }
        } else {
            status.currentChar++;
            secondChar = elements.getCharSpan(
                elements.container,
                status.currentWord,
                status.currentChar
            );
        }
        if (status.currentWord < words.length)
            secondChar.classList.add("cursor");
    }

});
