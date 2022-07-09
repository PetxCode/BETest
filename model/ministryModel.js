const mongoose = require("mongoose");

const ministrySchema = mongoose.Schema(
	{
		title: {
			type: String,
		},

		give: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "gives",
			},
		],

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ministrys", ministrySchema);
