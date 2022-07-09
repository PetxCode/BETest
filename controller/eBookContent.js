const adminModel = require("../model/userModel");
const contentModel = require("../model/eBookModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const createContent = async (req, res) => {
	try {
		const { eBookCover, cost, title, description, eBook } = req.body;
		const getUser = await adminModel.findById(req.params.id);
		const content = await new contentModel({
			title,
			description,
			eBook,
			cost,
			eBookCover,
		});

		content.user = getUser;
		content.save();

		getUser.eBookContent.push(mongoose.Types.ObjectId(content._id));
		getUser.save();

		res.status(201).json({ message: "Audio created", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewContents = async (req, res) => {
	try {
		const content = await contentModel.find();
		res.status(201).json({ message: "All contents", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewContent = async (req, res) => {
	try {
		const content = await adminModel
			.findById(req.params.id)
			.populate({ path: "eBookContent", options: { sort: { createdAt: -1 } } });

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewOneContent = async (req, res) => {
	try {
		const content = await contentModel.findById(req.params.content);

		res.status(201).json({ message: "View content", data: content });
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

const updateContent = async (req, res) => {
	try {
		const { cost, title, description } = req.body;

		const content = await contentModel.findByIdAndUpdate(
			req.params.content,
			{ title, description, cost },
			{ new: true }
		);
		res.status(201).json({ message: "content updated", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const likeContent = async (req, res) => {
	try {
		const getUser = await contentModel.findByIdAndUpdate(
			req.params.content,
			{
				$push: { like: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "post created", data: getUser });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const disLikeContent = async (req, res) => {
	try {
		const getUser = await contentModel.findByIdAndUpdate(
			req.params.content,
			{
				$pull: { like: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "post created", data: getUser });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	updateContent,
	deleteContent,
	viewContent,
	viewContents,
	createContent,
	viewOneContent,
	likeContent,
	disLikeContent,
};
