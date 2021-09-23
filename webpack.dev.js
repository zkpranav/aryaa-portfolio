const path = require('path')
const commonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const portFinderSync = require('portfinder-sync')

module.exports = merge(
    commonConfig,
    {
        mode: 'development',
        devServer: {
            static: {
                directory: path.resolve(__dirname, './dist'),
                watch: true
            },
            host: '0.0.0.0',
            port: portFinderSync.getPort(8080),
            https: false,
            client: {
                overlay: true,

            }
        }
    }
)