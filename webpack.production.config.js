var webpackStrip = require('strip-loader')
var devConfig = require('./webpack.config.dev')

var stripLoader = {
    test:[/\.js$/, /\.es6$/],
    exclude: /node_modules/,
    loader: webpackStrip.loader('console.log')
}

devConfig.module.loader.push(stripLoader)

module.exports = devConfig;