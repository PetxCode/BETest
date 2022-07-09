const {
	updateContentSeen,
	updateContentDeliver,
	deleteContent,
	viewContent,
	viewContents,
	createContent,
	viewOneContent,
	viewJustContent7,
} = require("../controller/orderController");

const express = require("express");
const router = express.Router();

router.route("/:id/:book/create").post(createContent);

router.route("/:id/").get(viewContent);
router.route("/:id/five").get(viewJustContent7);

router.route("/").get(viewContents);

router.route("/:id/:content").get(viewOneContent).delete(deleteContent);

router.route("/:id/:content/seen").patch(updateContentSeen);

router.route("/:id/:content/deliver").patch(updateContentDeliver);

module.exports = router;
