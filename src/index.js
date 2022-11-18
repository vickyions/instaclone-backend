const mongoose = require("mongoose");
const app = require("./app.js");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

mongoose.connect(MONGODB_URL, { dbName: "instaclone" }, (err) => {
    if (err) console.dir(err);
    console.log("Connected to the mongoDB cluster");
});

app.listen(PORT, (err) => {
    if (err) console.dir(err);
    console.log("Server listening on port ", PORT);
});
