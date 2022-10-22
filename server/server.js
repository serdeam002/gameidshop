const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')
const bodyParser = require('body-parser');

const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=> console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=> console.log(err))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set EJS as templating engine
app.set("view engine", "ejs");

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use('/uploads', express.static('uploads'))

//route
app.use('/api',blogRoute)
app.use('/api',authRoute)

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`start server in port ${port}`))