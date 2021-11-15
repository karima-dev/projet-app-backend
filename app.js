
var express = require("express")
var app = express()
var cors = require('cors')
var variables = require("./Configs/variables")
var biblioRouter = require('./Routes/biblio.routes');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/livres', biblioRouter);
//app.use('/decouvrir', usersRouter);
app.listen(8888, () => {
    console.log("app running in port ")
})