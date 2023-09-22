const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
let PORT = 8000
const db = require("./helper/db")
app.use(cors())
app.use(express.json())
require("./routes/index.routes")(app)
let database = require("./helper/db");
// database.initModels();
// database.connect();

app.listen(PORT,()=>{
    console.log(`Server connected on ${PORT}`)

})


module.exports = app