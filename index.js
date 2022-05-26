const express = require('express')
const app = express()

const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')

dotenv.config()

mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('Connected to MongoDB')
    }
    )

app.listen(4000, () => {
    console.log('Server is running');
})