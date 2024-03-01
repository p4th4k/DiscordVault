class File {
  #fileData;
  #guild;
  constructor(clientInstance) {
    this.client = clientInstance;
    this.#fileData = {};
    this.#guild = this.client.guilds.cache.first();
  }

  async getFiles() {
    for (const [, channel] of this.#guild.channels.cache) {
      if (channel.type === 0){
        this.#fileData[channel.name] = []
        
        const messages = await channel.messages.fetch()
        messages.forEach(message =>  {
            Array.from(message.attachments).forEach(msg => {
              let name = msg[1].name;
              let size = msg[1].size
              let url = msg[1].url;

              this.#fileData[channel.name].push({
                name: name,
                size: size,
                url: url                
              })
            })
        })
      }
    }
    
    return this.#fileData;
  }
}

/*
Get all files data (everything except texts, gifs)
Add file to a specific channel
Delete file from a specific channel
If file is greater than 20mb, then break it into segments and then do all the download and upload stuff
*/

module.exports = File;
