const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}))

app.use('/api',
    require('./routers/register.router')
)

// Handle error
const error = require('./middlewares/error')
app.use(error)

// Listen the server
const PORT = process.env.PORT || 4000
app.listen(PORT, err => {
    if (err) console.log(`Server listening error: ${err}`)
        console.log(`Server listening on port ${PORT}`)
})