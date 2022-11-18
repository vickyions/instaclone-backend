const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    likes: {
        type: Number,
        min: [0, "likes cant be less than 0 provided likes {VALUE}"],
        required: true,
        default: 0,
    },
    description: { type: String, required: true },
    PostImage: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;
