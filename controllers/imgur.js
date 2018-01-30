const axios = require('axios')
const FormData = require('form-data')


const upload = async (url) => {
  try {
    const form = new FormData()
    form.append('image', url)

    const headers = {
      ...form.getHeaders(),
      Authorization: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
    }

    const res = await axios.post('https://api.imgur.com/3/image', form, { headers })

    return res.data.data
  } catch (err) {
    console.log(err.response.data)
    throw new Error('Unable to get imgur link')
  }
}

module.exports = upload
