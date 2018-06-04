const mongoose = require('mongoose')
//linke mongo
const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)
//if connect successfully, run function
mongoose.connection.on('connected', function(){
  console.log('mongo connect success')
})