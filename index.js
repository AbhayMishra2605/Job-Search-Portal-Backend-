const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/users");
const bodyParser = require("body-parser");
const jobRoute = require('./routes/job');
const cors=require('cors');


app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/api/user',userRoute);
app.use("/api/job", jobRoute);




const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "try.html"));
});


app.listen(PORT, () => {
    console.log("Server is running on port 3000");
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(err);
    });
});
