const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const Userrouter = require("./routes/user.router");
dotenv.config();
connectDB();
 const app = express();
app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 // Routes
// Mount the user router under /api so the router's /login and /register paths become
// /api/login and /api/register respectively.
app.use("/api", Userrouter);

 app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
