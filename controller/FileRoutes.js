const express = require("express");
const path = require("path")
const upload = require("../upload");
const FileRouter = express.Router();

let file;
const getInstanceOfFile = (instance) => (file = instance);

FileRouter.get("/getFiles", async (req, res) => {
    let fileData = await file.getFilesData()
    res.json(fileData);
})

FileRouter.post("/addFile", upload.single('file') ,async (req, res) => {
    let fileName = req.file.filename;
    let filePath = `./uploads/${fileName}`
    const channelID = req.body.channelID;

    let fileC = await file.addFile(fileName, filePath, channelID);

    if(fileC) res.json({err: fileC})
    res.json({msg: 'File successfully uploaded'})
})

FileRouter.delete("/deleteFile", async (req, res) => {
    const msgId = req.body.msgID;
    const channelID = req.body.channelID;
    let fileC = await file.deleteFile(msgId, channelID)

    if(fileC) res.json({err: fileC})
    res.json({msg: 'File successfully deleted'})
})

module.exports = {getInstanceOfFile, FileRouter}