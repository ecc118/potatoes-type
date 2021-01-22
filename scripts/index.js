import { getQuote } from "./text.js";
import {
    getWords,
    addWords,
    checkIfChar,
    checkIfCorrect,
    getStartTime,
    getTimerTime,
    calcWpm,
} from "./utils.js";
import * as elements from "./elements.js";

window.addEventListener("load", () => {
    elements.loader.parentElement.removeChild(elements.loader);
});

const status = {
    currentWord: 0,
    currentChar: 0,
    currentWordString: "",
    previousWordString: "",
    correctWords: 0,
    startTime: 0,
    currentTime: 0,
    finished: false,
};

getQuote()
    .then((data) => {
        const words = getWords(data.content);
        addWords(elements.container, words);
        elements.author.innerText = data.author;

        elements.wordTotal.innerText = words.length;

        document.addEventListener("keydown", (e) => {
            if (e.key == "/" || e.key == "'") e.preventDefault();

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

            if (e.key == "Backspace") {
                if (status.currentWord === 0 && status.currentChar === 0)
                    return;
                else {
                    if (status.currentChar === 0) {
                        if (words[status.currentWord - 1].correct) return;
                        status.currentWordString = status.previousWordString;
                        status.currentWord--;
                        status.currentChar =
                            words[status.currentWord].word.length - 1;
                    } else {
                        status.currentChar--;
                    }
                    status.currentWordString = status.currentWordString.slice(
                        0,
                        -1
                    );

                    currentCharEl.classList.remove("cursor");
                    const prevChar = elements.getCharSpan(
                        elements.container,
                        status.currentWord,
                        status.currentChar
                    );
                    prevChar.setAttribute("class", "letter");
                    prevChar.classList.add("cursor");
                }

                return;
            }

            if (!checkIfChar(e.key)) {
                // whitespace bullsitery
                let key;
                if (e.key.charCodeAt(0) == 32) key = "\xa0";
                else key = e.key;
                status.currentWordString = status.currentWordString + key;
                if (
                    e.key == currentCharEl.innerText ||
                    (e.key.charCodeAt(0) == 32 &&
                        currentCharEl.innerText.charCodeAt(0) == 160)
                ) {
                    currentCharEl.classList.add("correct");
                } else {
                    currentCharEl.classList.add("incorrect");
                }

                currentCharEl.classList.remove("cursor");

                let secondChar;
                const checkedCorrect = checkIfCorrect(
                    status.correctWords,
                    status.currentWordString,
                    words[status.currentWord].word
                );
                if (
                    words[status.currentWord].word.length - 1 ==
                    status.currentChar
                ) {
                    status.correctWords = checkedCorrect.correctWords;
                    if (checkedCorrect.correct)
                        words[status.currentWord].correct = true;
                    status.previousWordString = status.currentWordString;

                    elements.correctWordCount.innerText = status.correctWords;
                    status.currentChar = 0;
                    status.currentWord++;

                    const wpm = Math.floor(
                        calcWpm(
                            status.correctWords,
                            getTimerTime(status.startTime)
                        )
                    );
                    elements.wpmCount.innerText = wpm;

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
    })
    .catch((error) => console.log(error));
