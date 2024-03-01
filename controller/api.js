const apiRouter = require("express").Router();

const { Client, GatewayIntentBits } = require("discord.js");
const { TOKEN } = require("../utils/config");

const Channel = require("../discordClient/Channel");
const { getInstanceOfChannel, ChannelRouter } = require("./ChannelRoutes");

const File = require("../discordClient/File");
const {getInstanceOfFile, FileRouter} = require("./FileRoutes")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

client.login(TOKEN);

client.on("ready", () => {
  const channel = new Channel(client);
  const file = new File(client)

  getInstanceOfChannel(channel);
  getInstanceOfFile(file);

  apiRouter.use("/channels/", ChannelRouter);
  apiRouter.use("/file/", FileRouter)
});

module.exports = apiRouter;
