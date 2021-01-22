import Text from "./text.js";
import { getWords, addWords, checkIfChar, checkIfCorrect, getStartTime, getTimerTime, calcWpm } from "./utils.js";
import * as elements from "./elements.js";

const status = {
    currentWord: 0,
    currentChar: 0,
    currentWordString: "",
    correctWords: 0,
    startTime: 0,
    currentTime: 0,
    finished: false,
};

const words = getWords(Text);
addWords(elements.container, words);

document.addEventListener("keydown", e => {
    if (e.key == "/") e.preventDefault();

    if (status.finished) {
        console.log("finished");
        return;
    }

    if (status.startTime == 0) status.startTime = getStartTime();

    const currentCharEl = elements.getCharSpan(
        elements.container,
        status.currentWord,
        status.currentChar
    );

    if (!checkIfChar(e.key)) {
        if (e.key == currentCharEl.innerText ||
            (e.key.charCodeAt(0) == 32 &&
            currentCharEl.innerText.charCodeAt(0) == 160)) {

            status.currentWordString = status.currentWordString +
                words[status.currentWord][status.currentChar];
            currentCharEl.classList.add("correct");
        }
        else {
            currentCharEl.classList.add("incorrect");
        }

        currentCharEl.classList.remove("cursor");
    
        let secondChar;
        if (words[status.currentWord].length - 1 == status.currentChar) {
            status.correctWords = checkIfCorrect(status.correctWords,
                                                status.currentWordString,
                                                words[status.currentWord]);
            elements.correctWordCount.innerText = status.correctWords;
            status.currentChar = 0;
            status.currentWord++;

            const wpm = Math.floor(calcWpm(status.correctWords, getTimerTime(status.startTime)));
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
