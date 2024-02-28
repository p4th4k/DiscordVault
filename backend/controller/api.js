const apiRouter = require("express").Router();

const { Client, GatewayIntentBits } = require("discord.js");
const { TOKEN } = require("../utils/config");

const Channel = require("../discordClient/Channel");
const { getInstanceOfChannel, ChannelRouter } = require("./ChannelRoutes");

const File = require("../discordClient/File");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

client.login(TOKEN);

client.on("ready", () => {
  const channel = new Channel(client);
  getInstanceOfChannel(channel);

  apiRouter.use("/", ChannelRouter);
});

module.exports = apiRouter;
