const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')
const express = require('express')

// route
const mainRoute = require('./routes/main')

// create server
const app = express()

dotenv.config()

// create mongoose connect
mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('Connected to MongoDB')
    }
)

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.get('/', (req,res) => {
    res.send('home page')
})

app.use('/api', mainRoute)

app.get('*', (req,res) => {
    res.send('catch')
})

app.listen(4000, () => {
    console.log('Server is running');
})