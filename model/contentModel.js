const mongoose = require("mongoose");

const audioContentSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},

		audioFile: {
			type: String,
		},

		audioCover: {
			type: String,
		},

		audioID: {
			type: String,
		},
		cost: {
			type: Number,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},

		like: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "likes",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("audioContents", audioContentSchema);
