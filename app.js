const express = require("express");
const app = express();
const apiRouter = require("./controller/api.js");
const {requestLogger, unknownEndpoint} = require("./utils/middleware");

app.use(express.json())
app.use(requestLogger)

app.use("/api",apiRouter)

app.use(unknownEndpoint)

module.exports = app;