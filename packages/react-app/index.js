const http = require('http');
const express = require('express');
const app = express();

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

var compiler = webpack(config);

app.use(
  require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(
  require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })
);

var server = http.createServer(app);
server.listen(process.env.PORT || 1616, function() {
  console.log('Listening on %j', server.address());
});
