const adminModel = require("../model/ministryModel");
const userModel = require("../model/userModel");
const memberModel = require("../model/memberModel");
const contentModel = require("../model/giveModel");
const mongoose = require("mongoose");

const createContent = async (req, res) => {
	try {
		const { cost } = req.body;

		const getUser = await adminModel.findById(req.params.content);
		const memberUser = await memberModel.findById(req.params.id);

		const content = await new contentModel({
			cost,
			who: memberUser.fullName,
			name: getUser.title,
			image: memberUser.avatar,
		});

		content.ministry = getUser;
		content.save();

		getUser.give.push(mongoose.Types.ObjectId(content._id));
		getUser.save();

		const memberID = memberUser.admin;
		await userModel.findByIdAndUpdate(
			memberID,
			{
				$push: { givers: content._id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "ministry created", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createAdminContent = async (req, res) => {
	try {
		const { cost } = req.body;

		const getUser = await adminModel.findById(req.params.content);

		const userUser = await userModel.findById(req.params.id);

		const content = await new contentModel({
			cost,
			admin: userUser.fullName,
			name: getUser.title,
			image: userUser.avatar,
		});

		content.ministry = getUser;
		content.save();

		getUser.give.push(mongoose.Types.ObjectId(content._id));
		getUser.save();

		await userModel.findByIdAndUpdate(
			userUser._id,
			{
				$push: { givers: content._id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "ministry created", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewContents = async (req, res) => {
	try {
		const content = await contentModel.find().sort({ createAt: -1 });
		res.status(201).json({ message: "All contents", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewContentGiver = async (req, res) => {
	try {
		const content = await userModel
			.findById(req.params.id)
			.populate({ path: "givers", options: { sort: { createdAt: -1 } } });

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewContentGiverOne = async (req, res) => {
	try {
		const content = await userModel.findById(req.params.id).populate({
			path: "givers",
			options: { sort: { createdAt: -1 }, limit: 3 },
		});

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewContentGiverOne7 = async (req, res) => {
	try {
		const content = await userModel.findById(req.params.id).populate({
			path: "givers",
			options: { sort: { createdAt: -1 }, limit: 7 },
		});

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewContent = async (req, res) => {
	try {
		const content = await adminModel
			.findById(req.params.ministry)
			.populate({ path: "give", options: { sort: { createdAt: -1 } } });

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewJust7Content = async (req, res) => {
	try {
		const content = await adminModel.findById(req.params.ministry).populate({
			path: "give",
			options: { sort: { createdAt: -1 }, limit: 7 },
		});

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewJustOneContent = async (req, res) => {
	try {
		const content = await adminModel.findById(req.params.ministry).populate({
			path: "give",
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

		getUser.ministry.pull(content);
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
	createAdminContent,
	viewContentGiver,
	viewContentGiverOne,
	viewContentGiverOne7,
};
