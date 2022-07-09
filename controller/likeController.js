const adminModel = require("../model/userModel");
const contentModel = require("../model/contentModel");
const mongoose = require("mongoose");

const createContent = async (req, res) => {
	try {
		const getUser = await contentModel.findById(req.params.id);
		const content = await new likeModel({
			like: req.params.id,
		});

		content.user = getUser;
		content.save();

		getUser.audioContent.push(mongoose.Types.ObjectId(content._id));
		getUser.save();

		res.status(201).json({ message: "Audio created", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteContent = async (req, res) => {
	try {
		const getUser = await adminModel.findById(req.params.id);
		const content = await contentModel.findByIdAndRemove(req.params.content);

		getUser.audioContent.pull(content);
		getUser.save();

		res.status(201).json({ message: "content deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
