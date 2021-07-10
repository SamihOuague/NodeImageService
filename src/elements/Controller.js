const { writeFile } = require("fs");
const uniqueStr = require("unique-slug");

module.exports = {
    upload: (req, res) => {
        if (req.body.img.match(/^data:image\/[a-z]+;base64,/)) {
            const ext = req.body.img.split(",")[0].split("/")[1].split(";")[0];
            const randFileName = uniqueStr() + uniqueStr() + "." + ext;
            const { b64, path } = {
                b64: req.body.img.split(",")[1],
                path: "./public/images/" + randFileName,
            };
            writeFile(path, b64, "base64", (err) => {
                if (err) res.send({ err });
                else res.send({ message: randFileName });
            });
        } else {
            res.send({ err: "invalid file !" });
        }
    }
}