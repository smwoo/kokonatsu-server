const uuidv4 = require('uuid/v4')

const User = require('../models/user')
const MacroManager = require('../models/macro-manager')


module.exports.bookmarksRoute = async (req, res) => {
  console.log(req)
  const { discordId } = req.query

  if (!discordId) {
    throw new Error('missing param discordId')
  }

  const { bookmarks } = await User.findOne({ discordId }).populate('bookmarks').exec()
  for (const bookmark of bookmarks) {
    const manager = MacroManager.findById(bookmark.macroManager)

    const index = manager.macros.indexOf(bookmark.id)

    bookmark.index = index
  }

  res.json(bookmarks)
}

module.exports.loginRoute = async (req, res) => {
  const { discordId } = req.body
  const authToken = uuidv4()

  const user = await User.findOneAndUpdate(
    { discordId },
    { $push: { authToken } },
    { upsert: true },
  )

  res.json(user)
}

