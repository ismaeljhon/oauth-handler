const fs = require('fs');
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  // publicPath: "./",
  publicPath: process.env.NODE_ENV == "production" ? "/" : "./",
  // devServer: {
  //   https: {
  //     key: fs.readFileSync('./certs/server.key'),
  //     cert: fs.readFileSync('./certs/server.cert'),
  //   },
  // },
}