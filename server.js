require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/connectDB");
const home = require("./util/home");
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.get("/", (req, res) => {
  res.send(home());
});
app.use("/api", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 4500;
const server = app.listen(PORT, () => {
  console.log(`Server started successfully!`);
});

module.exports = server;
