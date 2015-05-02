var mongoose = require('mongoose');
var db = require('../db.js');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

});


module.exports = mongoose.model('User', UserSchema);