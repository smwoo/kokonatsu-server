const axios = require('axios')


const MAX_ATTEMPTS = 20

const importUrl = async (url) => {
  const res = await axios.get('https://api.streamable.com/import', {
    params: {
      url,
    },
  })

  console.log(res.data)
  return res.data.shortcode
}

const getStreamableVideo = data => Object.assign(
  {},
  data.files.mp4,
  { thumbnail: data.thumbnail_url },
)

const checkStatus = async (shortCode) => {
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const url = `https://api.streamable.com/videos/${shortCode}`
    const res = await new Promise((res) => {
      setTimeout((arg) => { res(axios.get(arg)) }, 5000, url)
    })

    console.log(res.data)
    if (res.data.status === 2) {
      return getStreamableVideo(res.data)
    } else if (res.data.status === 3) {
      throw new Error('error uploading')
    }
  }

  throw new Error('error timeout')
}
/* eslint-enable no-await-in-loop */

const upload = async (url) => {
  const shortCode = await importUrl(url)
  const streamableVideo = await checkStatus(shortCode)
  console.log(streamableVideo)
  return streamableVideo
}

module.exports = upload