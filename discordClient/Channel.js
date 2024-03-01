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
        .catch(err => err)
    } else {
      return "Invalid Channel Name!";
    }
  }

  /**
   * @param {String} channelName - category to delete from guild
   */
  deleteChannel(channelName) {
    if(channelName){
        let channelCache = this.#guild.channels.cache;
        channelCache.forEach(channel => {
            if(channel.name === channelName) channel.delete()
        })
    } else {
        return "Invalid Channel Name!";
    }
  }

  /**
   * @param {String} categoryName - category to add to guild
   */
  addCategory(categoryName) {
    if(categoryName){
        this.#guild.channels.create({
            name: categoryName,
            type: ChannelType.GuildCategory
        }).catch(err => err)
    } else {
        return "Invalid Category Name!";
    }
  }

  /**
   * @param {String} categoryID - category to delete from guild
   */
  deleteCategory(categoryID) {
    const category = this.#guild.channels.cache.get(categoryID)

    if(!category || category.type !== 4) return "Category not found";

    this.#guild.channels.fetch().then(channels => {
      const categoryChannels = channels.filter(channel => channel.parentId === category.id)

      categoryChannels.forEach(channel => {
        channel.delete()
        .catch(err => err)
      })
    })

    category.delete()
    .catch(err => err)
  }
}

module.exports = Channel;
