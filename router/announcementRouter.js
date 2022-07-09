const {
	updateContent,
	deleteContent,
	viewContent,
	viewContents,
	createContent,
	viewOneContent,
	viewJustOneContent,
	viewJust7Content,
} = require("../controller/announcement");

const express = require("express");
const router = express.Router();

router.route("/:id/create").post(createContent);

router.route("/:id/").get(viewContent);
router.route("/:id/one").get(viewJustOneContent);

router.route("/:id/seven").get(viewJust7Content);

router.route("/").get(viewContents);

router
	.route("/:id/:content")
	.get(viewOneContent)
	.patch(updateContent)
	.delete(deleteContent);

module.exports = router;
