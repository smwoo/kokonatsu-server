const mongoose = require('mongoose')
const Macro = require('./macro')


const { Schema } = mongoose

const macroManagerSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    validate: val => !val.includes(' '),
    index: true,
  },
  macros: [{
    macro: {
      type: Schema.Types.ObjectId,
      ref: 'Macro',
    },
    created_at: Date,
  }],
})

macroManagerSchema.statics.findOneOrCreate = async function (macroManagerData) {
  let macroManager = await this.findOne(macroManagerData)
  if (!macroManager) {
    macroManager = await this.create(macroManagerData)
  }
  return macroManager
}

macroManagerSchema.statics.createNewMacro = async function (macroManagerData, macroData) {
  const newMacro = await Macro.create(macroData)
  const newMacroManager = await this.findOneOrCreate(macroManagerData)

  newMacroManager.macros.push({ macro: newMacro, created_at: newMacro.created_at })
  newMacro.macroManager = newMacroManager

  newMacro.save()
  return newMacroManager.save()
}

const MacroManager = mongoose.model('MacroManager', macroManagerSchema)

module.exports = MacroManager
