const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        main: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            // HTML
            {
                test: /\.html$/i,
                use: ['html-loader']
            },
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // Images
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/images/'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './static'),
                    to: path.resolve(__dirname, './dist'),
                    noErrorOnMissing: true
                }
            ]
        })
    ]
}