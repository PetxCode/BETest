const express = require("express");
const upload = require("../utils/multer");
const logo = require("../utils/logo");
const {
	changePassword,
	resetPassword,
	deleteAdmin,
	updateAdminInfo,
	updateAdminImage,
	viewAdmins,
	verifyAdmin,
	createAdmin,
	viewAdmin,
	signinAdmin,
	deleteMember,
	viewAdminMembers,
	updateAdminLogo,
} = require("../controller/adminController");
const router = express.Router();

router.route("/").get(viewAdmins);
router.route("/register").post(createAdmin);

router.route("/signin").post(signinAdmin);

router.route("/:id/:token").get(verifyAdmin);

router.route("/:id/").get(viewAdminMembers);

router.route("/reset").post(resetPassword);
router.route("/change/:id/:token").post(changePassword);

router.route("/:id/image").patch(upload, updateAdminImage);
router.route("/:id/logo").patch(upload, updateAdminLogo);

router.route("/:id").get(viewAdmin).patch(updateAdminInfo).delete(deleteAdmin);
router.route("/:id/:member").delete(deleteMember);

module.exports = router;
