const {
	updateContent,
	deleteContent,
	viewContent,
	viewContents,
	createContent,
	viewOneContent,
	viewJustOneContent,
	viewJust7Content,
	createAdminContent,
	viewContentGiver,
	viewContentGiverOne,
	viewContentGiverOne7,
} = require("../controller/giveController");

const express = require("express");
const router = express.Router();

router.route("/:id/").get(viewContentGiver);
router.route("/:id/limit").get(viewContentGiverOne);
router.route("/:id/limit7").get(viewContentGiverOne7);

router.route("/:id/:content/create").post(createContent);
router.route("/:id/:content/createAdmin").post(createAdminContent);

router.route("/:id/:ministry/").get(viewContent);

router.route("/:id/one").get(viewJustOneContent);

router.route("/:id/seven").get(viewJust7Content);

router.route("/").get(viewContents);

router
	.route("/:id/:content")
	.get(viewOneContent)
	.patch(updateContent)
	.delete(deleteContent);

module.exports = router;
