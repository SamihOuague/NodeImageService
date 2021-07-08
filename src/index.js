const uniqueStr = require("unique-slug");
const app = require("express")();
const cors = require("cors");
const fs = require("fs");
const json = require("body-parser").json;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
    res.send({ message: "It's OKOK" });
});

app.post("/upload", (req, res) => {
    if (req.body.img.match(/^data:image\/[a-z]+;base64,/)) {
        const ext = req.body.img.split(",")[0].split("/")[1].split(";")[0];
        const randFileName = uniqueStr() + uniqueStr() + "." + ext;
        const { b64, path } = {
            b64: req.body.img.split(",")[1],
            path: "./public/images/" + randFileName,
        };
        fs.writeFile(path, b64, "base64", (err) => {
            if (err) res.send({ err });
            else res.send({ message: randFileName });
        });
    } else {
        res.send({ err: "invalid file !" });
    }
});

app.listen("8080");