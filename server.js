require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
connectDB();

const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 4500;
const server = app.listen(PORT, () => {
  console.log(`server started at PORT:${PORT}`);
});

module.exports = server;
