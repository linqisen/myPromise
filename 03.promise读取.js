const fs = require("fs");

function Read(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile(url, "utf8", function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}

Read("file/1.txt").then((res) => {
    console.log("data", res);
});
