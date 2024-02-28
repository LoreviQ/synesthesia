async function search(searchQuery) {
    const response = await fetch(searchQuery);
    console.log(await response.text());
}

module.exports = { search };
