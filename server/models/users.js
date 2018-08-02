const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: {
    type: String, 
    required: [true, 'please input your usename']
  },
  name: {
    type: String, 
    required: [true, 'please input your name']
  },
  password: {
    type: String, 
    required: [true, 'please input your password']
  }
},{
  timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user;
