const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = express()
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket){
  // console.log('use login')
  socket.on('sendmsg',function(data){
    console.log(data)
    //send to global
    io.emit('recvmsg', data)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
//use middleware user, so all relate to user will forwaf to user.js
app.use('/user', userRouter)

server.listen(9093, function(){
  console.log('Node app start at port 9093')
})