const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const blogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Model
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;