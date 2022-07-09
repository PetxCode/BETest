const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../model/userModel");
const memberModel = require("../model/memberModel");
const cloudinary = require("../utils/cloudinary");
const crypto = require("crypto");
const {
	resetUserPassword,
	verifiedUser,
	verifiedSignUser,
} = require("../utils/email");

const viewAdmins = async (req, res) => {
	try {
		const view = await adminModel.find();
		res.status(200).json({
			message: "found",
			data: view,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewAdminMembers = async (req, res) => {
	try {
		const view = await adminModel
			.findById(req.params.id)
			.populate({ path: "member", options: { createdAt: -1 } });
		res.status(200).json({
			message: "found",
			data: view,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteMember = async (req, res) => {
	try {
		const getUser = await adminModel.findById(req.params.id);
		const content = await memberModel.findByIdAndRemove(req.params.member);

		getUser.member.pull(content);
		getUser.save();

		res.status(201).json({ message: "member deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewAdmin = async (req, res) => {
	try {
		const view = await adminModel.findById(req.params.id);
		res.status(200).json({
			message: "found",
			data: view,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteAdmin = async (req, res) => {
	try {
		await adminModel.findByIdAndRemove(req.params.id);
		res.status(200).json({
			message: "deleted",
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateAdminImage = async (req, res) => {
	try {
		const image = await cloudinary.uploader.upload(req.file.path);
		console.log(req.file.path, image);

		const viewAdmin = await adminModel.findByIdAndUpdate(
			req.params.id,
			{
				avatar: image.secure_url,
				avatarID: image.public_id,
			},
			{ new: true }
		);
		res.status(200).json({
			message: "church updated",
			data: viewAdmin,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateAdminLogo = async (req, res) => {
	try {
		const image = await cloudinary.uploader.upload(req.file.path);
		console.log(req.file.path, image);

		const viewAdmin = await adminModel.findByIdAndUpdate(
			req.params.id,
			{
				logo: image.secure_url,
				logoID: image.public_id,
			},
			{ new: true }
		);
		res.status(200).json({
			message: "church Logo updated",
			data: viewAdmin,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateAdminInfo = async (req, res) => {
	try {
		const { fullName, displayName, careLine } = req.body;
		const user = await adminModel.findById(req.params.id);

		if (user) {
			const viewAdmin = await adminModel.findByIdAndUpdate(
				user._id,
				{
					fullName,
					careLine,
					displayName,
				},
				{ new: true }
			);
			res.status(200).json({
				message: "church updated",
				data: viewAdmin,
			});
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createAdmin = async (req, res) => {
	try {
		const { status, email, password, churchName, fullName } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const token = crypto.randomBytes(5).toString("hex");
		const coded = await bcrypt.hash(token, salt);
		const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

		const user = await adminModel.create({
			email,
			password: hashed,
			churchName,
			fullName,
			churchCode: token,
			token: accessToken,
			status: "admin",
		});

		verifiedUser(email, user._id, accessToken)
			.then((result) => {
				console.log("sent: ", result);
			})
			.catch((error) => {
				console.log(error);
			});

		res.status(200).json({
			message: "check you email",
			data: viewAdmin,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const verifyAdmin = async (req, res) => {
	try {
		const user = await adminModel.findById(req.params.id);

		if (user) {
			if (user.token !== "") {
				await adminModel.findByIdAndUpdate(
					user._id,
					{
						token: "",
						verified: true,
					},
					{ new: true }
				);

				res.status(200).json({
					message: "You can now sign in",
				});
			} else {
				res.status(404).json({ message: "sorry you can't do this" });
			}
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const signinAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await adminModel.findOne({ email });
		if (user) {
			const check = await bcrypt.compare(password, user.password);
			if (check) {
				if (user.verified && user.token === "") {
					const { password, ...info } = user._doc;
					const myToken = jwt.sign(
						{
							_id: user._id,
							status: user.status,
						},
						"Let'sGetinNOW...",
						{ expiresIn: "2d" }
					);

					res
						.status(201)
						.json({ message: "welcome back", data: { myToken, ...info } });
				} else {
					const token = crypto.randomBytes(5).toString("hex");
					const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

					await adminModel.findByIdAndUpdate(
						user._id,
						{ token: accessToken },
						{ new: true }
					);
					verifiedSignUser(email, user, accessToken)
						.then((result) => {
							console.log("message sent again: ", result);
						})
						.catch((error) => console.log(error));
				}
			} else {
				res.status(404).json({ message: "Password isn't correct" });
			}
		} else {
			res.status(404).json({ message: "no user found" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await adminModel.findOne({ email });
		if (user) {
			if (user.verified && user.token === "") {
				const token = crypto.randomBytes(5).toString("hex");
				const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

				await adminModel.findByIdAndUpdate(
					user._id,
					{ token: accessToken },
					{ new: true }
				);
				resetUserPassword(email, user._id, accessToken)
					.then((result) => {
						console.log("message sent again: ", result);
					})
					.catch((error) => console.log(error));

				res.status(200).json({
					message: "Check your email to continue",
				});
			} else {
				res
					.status(404)
					.json({ message: "You do not have enough right to do this!" });
			}
		} else {
			res.status(404).json({ message: "user can't be found" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const changePassword = async (req, res) => {
	try {
		const { password } = req.body;
		const user = await adminModel.findById(req.params.id);
		if (user) {
			if (user.verified && user.token === req.params.token) {
				const salt = await bcrypt.genSalt(10);
				const hashed = await bcrypt.hash(password, salt);

				await adminModel.findByIdAndUpdate(
					user._id,
					{
						token: "",
						password: hashed,
					},
					{ new: true }
				);
			}
		} else {
			res.status(404).json({ message: "operation can't be done" });
		}

		res.status(200).json({
			message: "password changed",
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
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
};
