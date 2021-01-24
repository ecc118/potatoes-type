const container = document.querySelector(".typing-test");
const correctWordCount = document.querySelector(".word-count");
const wordTotal = document.querySelector(".word-total");
const wpmCount = document.querySelector(".wpm");
const author = document.querySelector(".author");
const loaderApi = document.querySelector(".loader-api");
const loaderPotatoe = document.querySelector(".loader-potatoe");
const potatoe = document.querySelector(".potatoe");

const getCharSpan = (container, currentWord, currentChar) => {
    const parents = [...container.children];
    const children = [...parents[currentWord].children];
    return children[currentChar];
};

export {
    container,
    correctWordCount,
    wordTotal,
    wpmCount,
    getCharSpan,
    author,
    loaderApi,
    loaderPotatoe,
    potatoe,
};
