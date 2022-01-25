const fs = require("fs");
const path = require("path");

const readFile = (filename, res) => fs.readFile(
    path.join(__dirname, '..', 'public', filename),
    (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(404);
            return res.end(JSON.stringify(err));
        }
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        return res.end(data);
    }
);

module.exports = {
    readFile,
}