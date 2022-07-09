const express = require("express");
const upload = require("../utils/multer");
const {
	createMember,
	viewMembers,
	verifyChurchMemebr,
	signinMember,
	resetPassword,
	changePassword,
	MemberProductsAudio,
	viewMember,
	updateMemberImage,
	updateMemberInfo,
} = require("../controller/memberController");
const router = express.Router();

router.route("/").get(viewMembers);
router.route("/:id/products").get(MemberProductsAudio);

router.route("/register").post(createMember);

router.route("/signin").post(signinMember);

router.route("/:id/:token").get(verifyChurchMemebr);

router.route("/reset").post(resetPassword);
router.route("/change/:id/:token").post(changePassword);

router.route("/:id/image").patch(upload, updateMemberImage);

router.route("/:id").get(viewMember).patch(updateMemberInfo);
// .delete(deleteAdmin);

module.exports = router;
