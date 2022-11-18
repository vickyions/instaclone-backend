const express = require('express');
const app = express();
const postsRoute = require('./routes/posts');
const cors = require('cors');

app.use(cors());
//bodyparsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use("/posts", postsRoute);

app.all("*", (_req, res) => {
    res.status(404).json({
        status: "failed",
        message: "Page Not Found"
    })
});

module.exports = app;
