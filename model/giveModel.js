const mongoose = require("mongoose");

const giveSchema = mongoose.Schema(
	{
		cost: {
			type: Number,
		},
		name: { type: String },
		who: {
			type: String,
		},
		admin: {
			type: String,
		},
		image: {
			type: String,
		},
		ministry: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ministrys",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("gives", giveSchema);
