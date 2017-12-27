const mongoose = require('mongoose')


const { Schema } = mongoose

const macroSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['gif', 'video', 'img'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
  url: {
    type: String,
    required: true,
  },
  thumbnail: String,
  width: Number,
  height: Number,
  macroManager: {
    type: Schema.Types.ObjectId,
    ref: 'MacroManager',
  },
})

macroSchema.pre('save', function (next) {
  this.updated_at = new Date()

  next()
})

const Macro = mongoose.model('Macro', macroSchema)

module.exports = Macro
