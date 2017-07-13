var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'CascadeComponents': './src/scripts/modules/CascadeComponents.ts'
    },
    output: {
        filename: './dist/bundle/[name].min.js',
        libraryTarget: 'var',
        library: '[name]'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    'stylus-loader'
                ]
            })
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'clean-css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } }
                ]
            })
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("./dist/bundle/[name].css")
    ]
};
