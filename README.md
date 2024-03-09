# DiscordVault

DiscordVault is a Node.js project that leverages the Discord API to create a file storage solution. The project is built on modular code principles, employs asynchronous programming in JavaScript, utilizes Express.js for creating an API, and integrates with the Discord.js library.

## Table of Contents

- [Technologies used](#technologies-used)
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Learnings](#learnings)
- [Improvements](#improvements)
- [Contributing](#contributing)
- [License](#license)

## Technologies used
- Node JS
- Express JS
- Discord JS

## Features
- Creating, Deleting and Reading Channels and Categories
- Uploading, Downloading, Deleting and Reading Files

## Usage

To use DiscordVault, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/p4th4k/DiscordVault.git
```

2. Install dependencies:

```bash
npm install 
```

3. Create a discord bot token and create .env file in the root of project:

```js
TOKEN="YOU_TOKEN_here"
PORT=3000
```

4. Add the discord bot to a server

<b>Note</b>: It only works for one server, it is not expected to work in multiple servers

5. Start the application

```bash
npm start
```

Now the API is up and running and can be easily integrated with the frontend.

## API Endpoints

```js
/api/channel/getChannels     --  GET   ; no params
/api/channel/createChannel   --  POST  ; JSON: categoryID, channelName
/api/channel/createCategory  --  POST  ; JSON: categoryName
/api/channel/deleteChannel   --  DELETE; JSON: channelName
/api/channel/deleteCategory  --  DELETE; JSON: categoryID

/api/file/getFiles           --  GET   ; no params
/api/file/addFile            --  POST  ; form-data: file: 'file.txt', channelID: 'channelID' 
/api/file/downloadFile       --  GET   ; JSON: msgID, channelID
/api/file/deleteFile         --  DELETE; JSON: msgID, channelID
```

<b>NOTE</b>: Downloaded files will be stored in ```./downloads/``` directory and the files to upload will be temporarily stored in the ```./uploads/``` directory until the file is uploaded to the server

## Learnings
- Using Node JS to create backend
   - Using Express JS to create API
   - Using Discord JS to interact with discord

- Asynchronous programming
   - Making use of async await syntax

- Writing Modular Code
   - Writing modular code makes it easy to debug and add features

- Testing API using Postman

## Improvements
- Breaking and tagging file pieces for files more than 20mb
- Optimizing file uploads and downloads
- Implementing the API for multiple servers

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)