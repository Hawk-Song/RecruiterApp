const express = require('express')
const userRouter = require('./user')

//create new app
const app = express()
//use middleware user, so all relate to user will forwaf to user.js
app.use('/user', userRouter)


app.listen(9093, function(){
  console.log('Node app start at port 9093')
})