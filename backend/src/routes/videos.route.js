const express = require("express");
const validate = require("../middlewares/validate");
const videoValidation = require("../validations/video.validation");
const videoController = require("../controllers/video.controller");

const router = express.Router();

router.get("/", validate(videoValidation.searchVideos), videoController.getVideos);

router.get("/:videoId", validate(videoValidation.getVideo), videoController.getVideo);

router.post("/", validate(videoValidation.setVideo), videoController.setVideo);

router.patch("/:videoId/votes", validate(videoValidation.changeVote), videoController.changeVote);

router.patch("/:videoId/views", validate(videoValidation.changeView), videoController.changeView);

module.exports = router;