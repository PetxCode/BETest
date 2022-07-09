const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		who: {
			type: String,
		},
		what: {
			type: String,
		},
		admin: {
			type: String,
		},
		churchName: {
			type: String,
		},
		displayName: {
			type: String,
		},
		churchCode: {
			type: String,
		},
		detail: {
			type: String,
		},
		cost: {
			type: Number,
		},
		seen: {
			type: Boolean,
		},
		delivered: {
			type: Boolean,
		},

		member: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "members",
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "admins",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
