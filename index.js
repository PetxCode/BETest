const express = require("express");
const cors = require("cors");
require("./utils/db");
const port = process.env.PORT || 2233;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "You are welcome to One Church Network" });
});

app.use("/api/admin", require("./router/adminRouter"));
app.use("/api/member", require("./router/memberRouter"));
app.use("/api/content", require("./router/contentRouter"));
app.use("/api/eBook", require("./router/eBookRouter"));
app.use("/api/announcement", require("./router/announcementRouter"));
app.use("/api/order", require("./router/orderRouter"));
app.use("/api/ministry", require("./router/minitryRouter"));
app.use("/api/give", require("./router/giveRouter"));

app.listen(port, () => {
	console.log("Server is now Active...!");
});

module.exports = app;
