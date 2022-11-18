const router = require("express").Router();
const uuidv4 = require("uuid").v4;
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage }); //to handle form-data

//const multipart = require('connect-multiparty')();

const Post = require("../models/Post");

router.get("/", async (_req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      status: "success",
      message: "Succefully fetched all posts",
      posts,
    });
  } catch (err) {
    console.log("get endpoint error::");
    console.dir(err);
    res.status(500).json({
      status: "failed",
      message: "server error while fetching the posts",
    });
  }
});

router.post("/", upload.any(), async (req, res) => {
  let globImage = null;
  try {
    const file = req.files[0];
    let imageFile = file.path;
    if (imageFile) globImage = imageFile;
    // Upload file to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageFile, {
      tags: "instaclone",
    });
    //console.log(uploadedImage);
    //saving post to db
    const post = await Post.create({
      ...req.body,
      PostImage: uploadedImage.secure_url,
    });
    res.json({
      status: "success",
      message: "successfully uploaded the post",
      post,
    });
    //deleting after success
    fs.unlink(imageFile, (err) => {
      if (err) console.dir(err);
      else console.log("deleted file after successfull upload", imageFile);
    });
  } catch (err) {
    console.log("post endpoint error:: ");
    console.dir(err);
    res.status(500).json({
      status: "failed",
      message: "server error during posting image",
    });
    //even if failed delete that file
    if (globImage) {
      fs.unlink(globImage, (err) => {
        if (err) console.dir(err);
        else console.log("deleted file after some error", globImage);
      });
    }
  }
});

module.exports = router;
