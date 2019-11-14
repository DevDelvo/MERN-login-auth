const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

// Bodyparse middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// DB config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true}).then(() => {
    console.log("MongoDB successfuly connected")
}).catch(err => console.log(err));

const port = process.env.PORT || 5000; 

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
})