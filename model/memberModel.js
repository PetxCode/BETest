const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
	{
		churchName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
		},
		displayName: {
			type: String,
		},
		fullName: {
			type: String,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
		},
		token: {
			type: String,
		},
		verified: {
			type: Boolean,
		},
		status: {
			type: String,
		},
		churchCode: {
			type: String,
		},
		phoneNumber: {
			type: Number,
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "admins",
		},
		order: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "orders",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("members", memberSchema);
