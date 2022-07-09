const adminModel = require("../model/userModel");
const contentModel = require("../model/announcement");
const mongoose = require("mongoose");

const createContent = async (req, res) => {
	try {
		const { message, title, description, eBook } = req.body;

		const getUser = await adminModel.findById(req.params.id);
		const content = await new contentModel({
			title,
			message,
		});

		content.user = getUser;
		content.save();

		getUser.announcement.push(mongoose.Types.ObjectId(content._id));
		getUser.save();

		res.status(201).json({ message: "announcement created", data: content });
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
			.populate({ path: "announcement", options: { sort: { createdAt: -1 } } });

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewJust7Content = async (req, res) => {
	try {
		const content = await adminModel.findById(req.params.id).populate({
			path: "announcement",
			options: { sort: { createdAt: -1 }, limit: 7 },
		});

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewJustOneContent = async (req, res) => {
	try {
		const content = await adminModel.findById(req.params.id).populate({
			path: "announcement",
			options: { sort: { createdAt: -1 }, limit: 1 },
		});

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

		getUser.announcement.pull(content);
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

module.exports = {
	updateContent,
	deleteContent,
	viewContent,
	viewContents,
	createContent,
	viewOneContent,
	viewJustOneContent,
	viewJustOneContent,
	viewJust7Content,
};
