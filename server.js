require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan =require("morgan");
const path = require("path");   // Not installed using npm, comes along with node.js

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mern", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => console.log("Successfully connected to Mongodb"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// HTTP Request Logger
app.use(morgan("tiny"));
app.use("/api", routes);

// to check if deployed or not
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, function () {
    console.log(`Server listening on ${PORT}`);
});