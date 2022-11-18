const router = require('express').Router();
const uuidv4 = require('uuid').v4;

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

router.post("/", (req, res) => {
    console.dir(req);
})

module.exports = router;
