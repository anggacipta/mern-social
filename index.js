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

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

//cors
app.use(cors())

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)

app.listen(8800, () => {
    console.log("Backend server is running on 8800");
})