const url = require("node:url");
const fs = require("node:fs");
const { JSDOM } = require("jsdom");

async function convertWordToColour(word) {
    const htmlBody = await getSearchHTML(word);
    const srcValues = await getImageSrc(htmlBody);
    console.log(srcValues);
}

async function getImageSrc(htmlBody) {
    const dom = new JSDOM(htmlBody);
    const imgElements = dom.window.document.querySelectorAll("img");
    const srcValues = [];
    for (const img of imgElements) {
        const src = img.getAttribute("src");
        if (src.includes("https")) {
            srcValues.push(src);
        }
    }
    return srcValues;
}

async function getSearchHTML(searchQuery) {
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
