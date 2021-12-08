
var express = require("express")
var app = express()
var cors = require('cors')
var variables = require("./Configs/variables")
var biblioRouter = require('./Routes/biblio.routes');
const port=process.env.PORT || 8888
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/livres', biblioRouter);
//app.use('/decouvrir', usersRouter);
app.listen(port, () => {
    console.log("app running in port ",port)
})