const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const autoIncrement = require('mongoose-auto-increment')
const http = require('http')
const socketServer =require('socket.io')

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// MONGOOSE CONNECT
// ===========================================================================
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/local')

var db = mongoose.connection
db.on('error', ()=> {console.log( '---Gethyl FAILED to connect to mongoose')})
db.once('open', () => {
	console.log( '+++Gethyl connected to mongoose')
})

var serve = http.createServer(app);
var io = socketServer(serve);
serve.listen(process.env.PORT || 3000,()=> {console.log("+++Gethyl Express Server with Socket Running!!!")})


/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const socketEvents = require('./src/server/socketEvents')(io);
