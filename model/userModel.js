const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		churchName: {
			type: String,
			unique: true,
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
		logo: {
			type: String,
		},
		logoID: {
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
		careLine: {
			type: Number,
		},
		member: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "members",
			},
		],
		announcement: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "announcements",
			},
		],
		audioContent: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "audioContents",
			},
		],
		eBookContent: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "eBookContents",
			},
		],
		order: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "orders",
			},
		],
		ministry: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "ministrys",
			},
		],
		givers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "gives",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("admins", userSchema);
