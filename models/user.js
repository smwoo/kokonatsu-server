const mongoose = require('mongoose')


const { Schema } = mongoose

const userSchema = new Schema({
  discordId: String,
  bookmarks: [{
    type: Schema.Types.ObjectId,
    ref: 'Macro',
  }],
  authToken: [String],
})

const User = mongoose.model('User', userSchema)

module.exports = User
