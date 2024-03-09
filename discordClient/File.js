const fs = require("fs")
const axios = require("axios")

class File {
  #fileData;
  #guild;
  constructor(clientInstance) {
    this.client = clientInstance;
    this.#fileData = {};
    this.#guild = this.client.guilds.cache.first();
  }

  async getFilesData() {
    for (const [, channel] of this.#guild.channels.cache) {
      if (channel.type === 0) {
        this.#fileData[channel.name] = [];

        const messages = await channel.messages.fetch();
        messages.forEach((message) => {
          Array.from(message.attachments).forEach((msg) => {
            let name = msg[1].name;
            let size = msg[1].size;
            let url = msg[1].url;

            this.#fileData[channel.name].push({
              name: name,
              size: size,
              url: url,
            });
          });
        });
      }
    }

    return this.#fileData;
  }

  /**
   *
   * @param {String} filePath
   * @param {String} channelID
   */

  async addFile(fileName, filePath, channelID) {
    let fileContent = `File uploaded at ${new Date()}`;
    const channel = await this.client.channels.cache.get(channelID);

    if (channel) {
      await channel.send({
        files: [{
          attachment: filePath,
          name: fileName,
        }],
        content: fileContent
      })

      fs.unlink(filePath, (err) => {if(err) throw err})
    } else {
      return "Channel does not exist";
    }
  }

  /**
   * 
   * @param {String} msgID 
   * @param {String} channelID 
   */
  async deleteFile(msgID, channelID){
    const channel = await this.client.channels.cache.get(channelID)

    if(channel){
      channel.messages.fetch(msgID)
      .then(msg => {
        if(msg){
          msg.delete()
          .catch(err => err)
        }
      }).catch(err => err)
    }
    else{
      return "Channel Does not exist";
    }
  }

  /**
   * 
   * @param {String} msgID 
   * @param {String} channelID 
   */
  async downloadFile(msgID, channelID){
    const channel = await this.client.channels.cache.get(channelID)

    if(channel){
      const message = await channel.messages.fetch(msgID)
      if(message.attachments.size > 0){
        message.attachments.forEach(async (attachment) => {
          const response = await axios.get(attachment.url, {responseType: 'arraybuffer'})

          const filePath = `./downloads/${attachment.name}`
          fs.writeFileSync(filePath, Buffer.from(response.data))
        })
      }
    }
    else{
      return "Channel Does not exist";
    }
  }
}

/*
Delete file from a specific channel
If file is greater than 20mb, then break it into segments and then do all the download and upload stuff
*/

module.exports = File;
