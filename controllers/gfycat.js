const axios = require('axios')


const MAX_ATTEMPTS = 20

const importUrl = async (fetchUrl) => {
  const res = await axios.post('https://api.gfycat.com/v1/gfycats', {
    fetchUrl,
    noMd5: true,
  })

  if (res.data.isOk === true) {
    return res.data.gfyname
  }

  throw new Error('invalid url')
}

const checkStatus = async (gfyname) => {
  console.log(gfyname)

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const res = await new Promise((res) => {
      setTimeout(
        (arg) => {
          res(axios.get(arg))
        },
        5000,
        `https://api.gfycat.com/v1/gfycats/fetch/status/${gfyname}`,
      )
    })

    console.log(res.data.task)
    if (res.data.task === 'complete') {
      return
    } else if (res.data.task === 'error' || res.data.task === 'NotFoundo') {
      throw new Error('error converting url')
    }
  }
  /* eslint-enable no-await-in-loop */

  throw new Error('timeout converting url')
}

const getGfycat = async (gfyname) => {
  const res = await axios.get(`https://api.gfycat.com/v1test/gfycats/${gfyname}`)

  return res.data.gfyItem
}

const upload = async (url) => {
  const gfyname = await importUrl(url)
  await checkStatus(gfyname)
  const gfycat = await getGfycat(gfyname)
  return gfycat
}

module.exports = upload
