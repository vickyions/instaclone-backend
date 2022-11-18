const router = require('express').Router();
const uuidv4 = require('uuid').v4;

const multer = require('multer');
const upload = multer(); //to handle form-data

const Post = require('../models/Post');

router.get("/", async (_req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            status: "success",
            message: "Succefully fetched all posts",
            posts
        })
    } catch (err) {
        console.dir(err);
        res.status(500).json({
            status: "failed",
            message: "server error while fetching the posts"
        });
    }
});

router.post("/", upload.any(),(req, res) => {
    console.dir(req.body);
    console.dir(req.files)
    res.json();
})

module.exports = router;
