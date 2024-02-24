const apiRouter = require("express").Router();
const {Client, GatewayIntentBits} = require("discord.js")
const {TOKEN} = require("../utils/config")

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
})

client.login(TOKEN);

apiRouter.get("/channels", (req, res) => {
    const guilds = client.guilds.cache.first();
    if(guilds){
        let data = {};
        const channels = guilds.channels.cache;
        
        channels.forEach(channel => {
            if(channel.type === 4) data[channel.name] = []
            if(channel.type === 0){
                let parentChannel = channel.parent;
                if(parentChannel.name in data){
                    data[parentChannel.name].push(channel.name)
                }
            }
        })
        res.send(data)
    }
})

module.exports = apiRouter;