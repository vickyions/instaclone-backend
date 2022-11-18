const mongoose = require("mongoose");
const app = require("./app.js");
require("dotenv").config();
const cloudinary = require('cloudinary').v2;

const MONGODB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

mongoose.connect(MONGODB_URL, { dbName: "instaclone" }, (err) => {
    if (err) console.dir(err);
    else console.log("Connected to the mongoDB cluster");
});

app.listen(PORT, (err) => {
    if (err) console.dir(err);
    else console.log("Server listening on port ", PORT);
});
