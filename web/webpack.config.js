const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin")
const webpack = require("webpack")

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, '/bundle'),
        filename: 'index_bundle.js'
    },
    devServer: {
        port: 8001
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve("./src"),
                    path.resolve("./node_modules/@ng-mw"),
                ],
                use: [
                    "babel-loader",
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: [
                                path.resolve("./node_modules/@ng-mw/reol/core.scss"),
                                path.resolve("./node_modules/@ng-mw/shared-react-components/style-settings-default.scss"),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-sprite-loader",
                        options: {
                            extract: true,
                            spriteFilename: "icon-set.svg",
                        },
                    },
                    "svgo-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new SpriteLoaderPlugin({ plainSprite: true }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new webpack.DefinePlugin({
            "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
        }),
    ]
}