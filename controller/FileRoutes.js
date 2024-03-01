const express = require("express");
const FileRouter = express.Router();

let file;
const getInstanceOfFile = (instance) => (file = instance);

FileRouter.get("/getFiles", async (req, res) => {
    let fileData = await file.getFiles()
    res.json(fileData);
})

module.exports = {getInstanceOfFile, FileRouter}