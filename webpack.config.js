const webpack = require('webpack');
const path = require('path');

const debug = process.env.NODE_ENV !== "production";

module.exports = {
    devtool: debug?'inline-sourcemap':null,
    entry: path.join(__dirname, 'src', 'app-client.js'),
    output: {
        path: path.join(__dirname, 'src', 'static', 'js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 3333,
        contentBase: 'src/static/',
        historyApiFallback: {
            index: '/index-static.html'
        }
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: 'babel_cache',
                            presets: ['react', 'es2015']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        // }),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warning: true},
        //     mangle: true,
        //     sourcemap: false,
        //     beautify: false,
        //     dead_code: true
        // })
    ]
};