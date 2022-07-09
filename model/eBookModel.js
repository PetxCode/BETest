const mongoose = require("mongoose");

const eBookContentSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		eBookCover: {
			type: String,
		},
		eBookID: {
			type: String,
		},
		eBookFile: {
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

module.exports = mongoose.model("eBookContents", eBookContentSchema);
