const fs = require('fs');
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: "./",
  // devServer: {
  //   https: {
  //     key: fs.readFileSync('./certs/server.key'),
  //     cert: fs.readFileSync('./certs/server.cert'),
  //   },
  // },
}