const memberModel = require("../model/memberModel");
const adminModel = require("../model/userModel");

const contentModel = require("../model/orderModel");
const bookModel = require("../model/eBookModel");

const mongoose = require("mongoose");

const createContent = async (req, res) => {
	try {
		const book = await bookModel.findById(req.params.book);

		const memberUser = await memberModel.findById(req.params.id);

		const getUser = await adminModel.findOne({
			admin: memberUser.admin,
		});

		// const church = await adminModel.findOne({
		// 	churchName: memberUser.churchName,
		// });

		const code = await adminModel.findOne({
			churchCode: memberUser.churchCode,
		});

		if (code) {
			const content = await new contentModel({
				who: memberUser.fullName,
				admin: memberUser.admin,
				churchName: memberUser.churchName,
				churchCode: memberUser.churchCode,
				displayName: memberUser.displayName,

				what: book.title,
				detail: book.description,
				cost: book.cost,
				seen: false,
				delivered: false,
			});

			content.admin = getUser;
			content.save();

			code.order.push(mongoose.Types.ObjectId(content._id));
			code.save();

			res.status(201).json({ message: "order created", data: content });
		}
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
			.populate({ path: "order", options: { sort: { createdAt: -1 } } });

		res.status(201).json({ message: "View content", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewJustContent7 = async (req, res) => {
	try {
		const content = await adminModel.findById(req.params.id).populate({
			path: "order",
			options: { sort: { createdAt: -1 }, limit: 5 },
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

		getUser.order.pull(content);
		getUser.save();

		res.status(201).json({ message: "content deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateContentSeen = async (req, res) => {
	try {
		const content = await contentModel.findByIdAndUpdate(
			req.params.content,
			{ seen: true },
			{ new: true }
		);
		res.status(201).json({ message: "content updated", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateContentDeliver = async (req, res) => {
	try {
		const content = await contentModel.findByIdAndUpdate(
			req.params.content,
			{ delivered: true },
			{ new: true }
		);
		res.status(201).json({ message: "content updated", data: content });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	updateContentSeen,
	updateContentDeliver,
	deleteContent,
	viewContent,
	viewContents,
	createContent,
	viewOneContent,
	viewJustContent7,
};
