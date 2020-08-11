const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");
const { findByIdAndDelete } = require("../models/blogPost");

// Routes
router.get("/", function (req, res) {
    BlogPost.find({}, (err, docs) => {
        if (!err) {
            if (docs) {
                res.json(docs);
            } else {
                res.send("Database returned 0 documents");
            }
        } else {
            console.log(err);
            res.send("Error ocurred");
        }
    })


});


router.post("/save", function (req, res) {
    
    console.log("Body: ", req.body);
    const data = new BlogPost( req.body );

    data.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                msg: "Data successfully deleted!",
            });
        }
    });

    
});
router.post("/delete", function (req, res) {

    console.log("id: ", req.body.Id);
    const id = req.body.Id;

    BlogPost.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
              msg: "Data successfully deleted!",
            });
        }
    })


});


router.get("/hello", function (req, res) {
    const data = {
        msg: "Hello World"
    };
    res.json(data);
});

module.exports = router;