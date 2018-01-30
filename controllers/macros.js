const gfycatApi = require('./gfycat')
const imgurApi = require('./imgur')
const streamableApi = require('./streamable')
const MacroManager = require('../models/macro-manager')


const PAGE_SIZE = 20

const generatePreview = async (sourceUrl, mediaType) => {
  if (mediaType === 'img') {
    const {
      link, width, height,
    } = await imgurApi(sourceUrl)

    return {
      url: link,
      thumbnail: link,
      width,
      height,
    }
  } else if (mediaType === 'gif') {
    const {
      mp4Url, width, height, posterUrl,
    } = await gfycatApi(sourceUrl)

    return {
      url: mp4Url,
      thumbnail: posterUrl,
      width,
      height,
    }
  } else if (mediaType === 'video') {
    const {
      url, width, height, thumbnail,
    } = await streamableApi(sourceUrl)

    return {
      url,
      thumbnail,
      width,
      height,
    }
  }

  return {}
}

module.exports.previewRoute = async (req, res) => {
  const { sourceUrl, mediaType } = req.body

  try {
    const preview = await generatePreview(sourceUrl, mediaType)
    res.json(preview)
  } catch (err) {
    console.log(err)
    res.status(500).send('unable to normalize source URL')
  }
}

module.exports.newRoute = async (req, res) => {
  const {
    name, sourceUrl, mediaType,
  } = req.body

  let { macroData } = req.body

  if (!macroData) {
    try {
      macroData = await generatePreview(sourceUrl, mediaType)
      macroData.type = mediaType
    } catch (e) {
      console.log(e)
      res.status(500).send('unable to normalize source URL')
    }
  }

  await MacroManager.createNewMacro({ name }, macroData)
  res.json(macroData)
}

module.exports.macrosRoute = async (req, res) => {
  const page = req.query.page || 1

  const macros = await MacroManager.find()
    .sort({ name: 'asc' })
    .skip(PAGE_SIZE * page)
    .populate('macros')
    .exec()

  res.json(macros)
}

module.exports.generatePreview = generatePreview
