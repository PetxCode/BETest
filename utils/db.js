const mongoose = require("mongoose");
const url = "mongodb://localhost/OneChurch";
const url2 =
	"mongodb+srv://OneChurch:OneChurch@cluster0.q3zol.mongodb.net/OneChurch?retryWrites=true&w=majority";

mongoose.connect(url2).then(() => {
	console.log("database is now connected...!");
});

module.exports = mongoose;
