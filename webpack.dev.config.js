var path = require('path');

module.exports = {
    entry: {
        'main': './src/scripts/main.ts'
    },
    output: {
        filename: './dist/bundle/[name].js',
        libraryTarget: 'var',
        library: '[name]'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'babel-loader?presets[]=es2015!ts-loader'
        }]
    }
};
