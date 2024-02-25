const apiRouter = require("express").Router();
const { Client, GatewayIntentBits } = require("discord.js");
const { TOKEN } = require("../utils/config");
const Channel = require("../discordClient/Channel");
const File = require("../discordClient/File");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.login(TOKEN);

client.on("ready", () => {
  const channel = new Channel(client);

  apiRouter.get("/channels", (req, res) => {
    res.json(channel.getChannels());
  });

  apiRouter.post("/createChannel", (req, res) => {
    const channelName = req.body["channelName"];
    const categoryID = req.body["cateogryID"];

    let newC = channel.addChannel(channelName, categoryID);

    if (newC) res.json({ err: newC });

    res.json({
      msg: `Channel successfully created`,
    });
  });
});

module.exports = apiRouter;
