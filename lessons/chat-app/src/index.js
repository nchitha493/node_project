const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views')
//setup handelbars engine and view locations
app.set('view engine','html')
app.set('views',viewPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

let count = 0 

io.on('connection' ,(socket)=>{
    console.log("New WebSocket Connection");

    socket.emit('countUpdated', count)
})

server.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})