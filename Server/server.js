const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth')

const app = express()

app.use(express.json()) // parse json
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }))
app.use('/auth', authRouter)

const { executeQuery } = require("./models/db");
(async () => {
    try {
        await executeQuery("SELECT 1");
        console.log("Database connected!");
    } catch (err) {
        console.error("Database connection failed.", err);
    }
})()

app.get("/", (req, res) => {
    res.send("Welcome to the backend API!")
})

const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`)
})