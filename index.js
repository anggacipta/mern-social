const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const cors = require("cors")
const multer = require("multer")
const path = require("path")

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

app.use("/images", express.static(path.join(__dirname, "public/images")))

//cors
app.use(cors())

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "public/images");
    },
    filename: (req,file,cb)=>{
        cb(null, req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded success");
    } catch (error) {
        console.log(error);
    }
})

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)

app.listen(8800, () => {
    console.log("Backend server is running on 8800");
})