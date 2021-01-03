const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CollectionSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  bookId: {
    type: String,
    require: true
  },
  readAt: {
    type: String
  },
  readId: {
    type: String
  },
  time: {
    type: Number
  }
})

module.exports = mongoose.model('Collection', CollectionSchema)
