const express = require("express");
const videoRoute = require("./videos.route");


const router = express.Router();

router.use("/videos", videoRoute);
module.exports = router;