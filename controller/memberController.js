const adminModel = require("../model/userModel");
const memberModel = require("../model/memberModel");
const cloudinary = require("../utils/cloudinary");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const decoder = require("jwt-decode");
const {
	verifiedMember,
	verifiedSignMember,
	resetMemberPassword,
} = require("../utils/email");

const createMember = async (req, res) => {
	try {
		const { fullName, email, churchName, churchCode, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const token = crypto.randomBytes(5).toString("hex");
		const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

		const church = await adminModel.findOne({ churchName });

		const code = await adminModel.findOne({ churchCode });

		if (code && church) {
			const newMember = await new memberModel({
				fullName,
				email,
				churchName,
				churchCode,
				password: hashed,
				token: accessToken,
				status: "member",
			});
			newMember.admin = church;
			newMember.save();

			church.member.push(mongoose.Types.ObjectId(newMember._id));
			church.save();

			verifiedMember(email, newMember._id, accessToken)
				.then((result) => {
					console.log("sent: ", result);
				})
				.catch((error) => {
					console.log(error);
				});

			res.status(201).json({ message: "Member created: check your mail" });
		} else {
			res.status(404).json({ message: "no match founded" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
const MemberProductsAudio = async (req, res) => {
	try {
		const user = await memberModel.findById(req.params.id);
		if (user) {
			console.log(user);
			const newUser = user.admin;
			const code = user.churchCode;
			const myData = await adminModel
				.findOne({ code })
				.populate({ path: "audioContent", options: { createdAt: -1 } });

			res
				.status(200)
				.json({ message: "user  found", myID: newUser, data: myData });
		} else {
			res.status(200).json({ message: "user not found" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const verifyChurchMemebr = async (req, res) => {
	try {
		const user = await memberModel.findById(req.params.id);

		if (user) {
			if (user.token !== "") {
				await memberModel.findByIdAndUpdate(
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

const viewMember = async (req, res) => {
	try {
		const members = await memberModel.findById(req.params.id);
		res.status(201).json({ message: "members", data: members });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewMembers = async (req, res) => {
	try {
		const members = await memberModel.find();
		res.status(201).json({ message: "members", data: members });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const signinMember = async (req, res) => {
	try {
		const { email, password, churchName, churchCode } = req.body;

		const user = await memberModel.findOne({ email });
		if (user) {
			const check = await bcrypt.compare(password, user.password);
			if (check) {
				if (user.verified && user.token === "") {
					if (
						churchCode === user.churchCode &&
						churchName === user.churchName
					) {
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
						res.status(404).json({
							message: "Either your Church Code or Church Name, isn't correct",
						});
					}
				} else {
					const token = crypto.randomBytes(5).toString("hex");
					const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

					await memberModel.findByIdAndUpdate(
						user._id,
						{ token: accessToken },
						{ new: true }
					);
					verifiedSignMember(email, user, accessToken)
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

		const user = await memberModel.findOne({ email });

		if (user) {
			if (user.verified && user.token === "") {
				const token = crypto.randomBytes(5).toString("hex");
				const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

				await memberModel.findByIdAndUpdate(
					user._id,
					{ token: accessToken },
					{ new: true }
				);
				resetMemberPassword(email, user._id, accessToken)
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
		res.status(404).json({ message: error });
	}
};

const changePassword = async (req, res) => {
	try {
		const { password } = req.body;
		const user = await memberModel.findById(req.params.id);
		if (user) {
			if (user.verified && user.token === req.params.token) {
				const salt = await bcrypt.genSalt(10);
				const hashed = await bcrypt.hash(password, salt);

				await memberModel.findByIdAndUpdate(
					user._id,
					{
						token: "",
						password: hashed,
					},
					{ new: true }
				);

				res.status(200).json({
					message: "You can now sign in with the new Password",
				});
			}
		} else {
			res.status(404).json({ message: "operation can't be done" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateMemberImage = async (req, res) => {
	try {
		const user = await memberModel.findById(req.params.id);

		if (user) {
			// await cloudinary.uploader.destroy(user.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);

			const viewAdmin = await memberModel.findByIdAndUpdate(
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
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateMemberInfo = async (req, res) => {
	try {
		const { displayName, fullName, phoneNumber } = req.body;
		const user = await memberModel.findById(req.params.id);

		if (user) {
			const viewAdmin = await memberModel.findByIdAndUpdate(
				user._id,
				{
					fullName,
					phoneNumber,
					displayName,
				},
				{ new: true }
			);
			res.status(200).json({
				message: "member updated",
				data: viewAdmin,
			});
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	updateMemberInfo,
	updateMemberImage,
	signinMember,
	verifyChurchMemebr,
	viewMembers,
	createMember,
	resetPassword,
	changePassword,
	MemberProductsAudio,
	viewMember,
};
