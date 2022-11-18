const router = require('express').Router();
const uuid = require('uuid');

const Post = require('./models/Post');

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


module.exports = router;
