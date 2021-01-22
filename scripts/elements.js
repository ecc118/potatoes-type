const container = document.querySelector(".typing-test");
const correctWordCount = document.querySelector(".word-count");
const wpmCount = document.querySelector(".wpm");

const getCharSpan = (container, currentWord, currentChar) => {
    const parents = [...container.children];
    const children = [...parents[currentWord].children];
    return children[currentChar];
};

export { container, correctWordCount, wpmCount, getCharSpan };
