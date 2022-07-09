const {
	updateContent,
	deleteContent,
	viewContent,
	viewContents,
	createContent,
	viewOneContent,
	likeContent,
	disLikeContent,
} = require("../controller/mediaContent");

const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

router.route("/:id/create").post(createContent);
router.route("/:id/").get(viewContent);

router.route("/").get(viewContents);
router
	.route("/:id/:content")
	.get(viewOneContent)
	.patch(updateContent)
	.delete(deleteContent);

router.route("/:id/:content/like").post(likeContent);

router.route("/:id/:content/dislike").post(disLikeContent);

module.exports = router;
