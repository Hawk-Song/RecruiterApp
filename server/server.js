const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

//create new app
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
//use middleware user, so all relate to user will forwaf to user.js
app.use('/user', userRouter)

app.listen(9093, function(){
  console.log('Node app start at port 9093')
})