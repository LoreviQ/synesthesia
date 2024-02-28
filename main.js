const { search } = require("./search.js");

async function main() {
    searchQuery =
        "https://www.google.com/search?sca_esv=2802dad21c2aa82f&rlz=1C1GCEA_enGB1088GB1088&sxsrf=ACQVn0-8Mn5WhvzYZuxhAdxeT5ObpwMDgQ:1709147063177&q=lucina&tbm=isch&source=lnms&sa=X&ved=2ahUKEwib2cb83M6EAxVy_bsIHfYDAQEQ0pQJegQIBhAB&biw=2048&bih=1066&dpr=1.25";
    search(searchQuery);
}

main();
