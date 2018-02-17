const Discord = require('discord.js')
const axios = require('axios')


const client = new Discord.Client()


const isCommand = content => content.startsWith('k!') || content.startsWith('K!')

const getMacro = async (msg) => {
  const [name, number] = msg.content.slice(2).split(' ')

  const res = await axios.get(
    `http://localhost:${process.env.PORT || 3000}/macros/${name}`,
    { params: { number } },
  )

  const macro = res.data

  msg.channel.send(`${macro.number}/${macro.total}\n${macro.url}`)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (msg) => {
  if (isCommand(msg.content)) {
    getMacro(msg)
  }
})

client.login(process.env.BOT_TOKEN)
