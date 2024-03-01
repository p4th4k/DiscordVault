const app = require("./app")
const logger = require("./utils/logger")
const {PORT} = require("./utils/config.js")

app.listen(PORT, () => {
    logger.info(`Listening at port ${PORT}`);
})