const webShot = require("node-webshot");
const path = require("path");

const screenshot = (website, cb) => webShot(website, path.join(__dirname, '..', 'public', 'bg.jpeg'), cb);

module.exports = {
    screenshot,
}