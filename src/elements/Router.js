const router = require("express").Router();
const { upload } = require("./Controller");

router.post("/upload", upload);

module.exports = router;