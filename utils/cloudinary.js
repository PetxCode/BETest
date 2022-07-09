const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "one-church-network",
	api_key: "771824633955772",
	api_secret: "QH6erdWe2s2YFpQGFYQ6Xrz7rqY",
	secure: true,
});

module.exports = cloudinary;
