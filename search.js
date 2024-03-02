const { url } = require("node:url");
const { fs } = require("node:fs");
const { JSDOM } = require("jsdom");
const sharp = require("sharp");
const axios = require("axios");

async function convertWordToColour(word) {
    const htmlBody = await getSearchHTML(word);
    const srcValues = await getImageSrc(htmlBody);
    getImageColourInfo(srcValues[0]);
}

async function getImageColourInfo(imageUrl) {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");
    const { width, height, channels } = await sharp(imageBuffer).metadata();
    const rawPixelData = await sharp(imageBuffer).raw().toBuffer();
    const colorInfo = processPixelData(rawPixelData, width, height, channels);
    console.log("Image Resolution:", `${width}x${height}`);
    console.log("Color Information:", colorInfo);
}

function processPixelData(rawPixelData, width, height, channels) {
    const colorInfo = {};

    for (let i = 0; i < rawPixelData.length; i += channels) {
        const colorChannels = rawPixelData.slice(i, i + channels);
        const hexCode = rgbToHex(...colorChannels);
        colorInfo[hexCode] = (colorInfo[hexCode] || 0) + 1;
    }

    return colorInfo;
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
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
