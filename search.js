const url = require("node:url");
const { JSDOM } = require("jsdom");

async function convertWordToColour(word) {
    const htmlBody = search(word);
}

async function search(searchQuery) {
    const searchURL =
        "https://www.google.com/search?&tbm=isch&q=" + searchQuery;
    const response = await fetch(searchURL);
    if (response.status >= 400) {
        throw Error(`HTTP Error Code: ${response.status}`);
    }
    if (!response.headers.get("Content-Type").includes("text/html")) {
        throw Error(`Content type is not 'text/html'`);
    }
    return await response.text();
}

module.exports = { convertWordToColour };
