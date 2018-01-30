const mongoose = require('mongoose')


mongoose.Promise = global.Promise

const prodURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`

const testURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST_DEV}`

const uriDict = {
  test: testURI,
  prod: prodURI,
}

module.exports.connect = (mode) => {
  const uri = uriDict[mode]

  mongoose.connect(uri)
}

module.exports.closeConnection = () => {
  mongoose.connection.close()
}

module.exports.drop = () => {
  mongoose.connection.db.dropDatabase()
}
