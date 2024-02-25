const { ChannelType } = require("discord.js");

class Channel {
    #guild;
    #channelData;
  constructor(clientInstance) {
    this.client = clientInstance;
    this.#guild = this.client.guilds.cache.first();
    this.#channelData = {};
  }

  getChannels() {
    if (this.#guild) {
      const channels = this.#guild.channels.cache;

      channels.forEach((channel) => {
        if (channel.type === 4)
          this.#channelData[channel.name] = {
            id: channel.id,
            textChannels: [],
          };
        if (channel.type === 0) {
          let parentChannel = channel.parent;
          if (parentChannel.name in this.#channelData) {
            this.#channelData[parentChannel.name]["textChannels"].push(
              channel.name
            );
          }
        }
      });
    } else {
      return "Err: Invalid Guild";
    }

    return this.#channelData;
  }
  /**
   * @param {String} categoryID - category ID to add channel to
   * @param {String} channelName - channel to add
   */
  addChannel(channelName, categoryID) {
    if (channelName) {
      this.#guild.channels
        .create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: categoryID,
        })
        .then((newChannel) => this.getChannels());
    } else {
      return "Invalid Channel Name!";
    }
  }
  /**
   * @param {String} categoryID - category to add to guild
   */
  addCategory(categoryID) {}
  /**
   * @param {String} categoryID - category to add to guild
   */
  deleteCategory(categoryID) {}
}

module.exports = Channel;
