const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

const getQuote = async () => {
    const response = await fetch(RANDOM_QUOTE_API_URL);
    return response.json();
};

export {
    getQuote,
}
