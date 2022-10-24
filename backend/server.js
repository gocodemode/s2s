const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
require('dotenv').config()
//bring routes
const blogRoutes = require('./routes/blog')

//app

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())


//cors
if (process.env.NODE_ENV === "development") {
    app.use(cors({origin: `${process.env.CLIENT_URL}`})); 
}

//routes middleware

app.use(express.urlencoded('blogRoutes'));


//database connection
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Error => ", err));

//port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})