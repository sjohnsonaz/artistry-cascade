var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode:'production',
    entry: {
        'ArtistryReact': './src/scripts/modules/ArtistryCascade.ts'
    },
    output: {
        filename: './bundle/[name].min.js',
        libraryTarget: 'var',
        library: '[name]'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['ts-loader']
        }, {
            test: /\.styl$/,
            //loader: "style-loader!css-loader!clean-css-loader!postcss-loader!less-loader",
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                //{ loader: 'postcss-loader', options: { sourceMap: true } },
                'stylus-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'clean-css-loader',
                //{ loader: 'postcss-loader', options: { sourceMap: true } }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "bundle/[name].css",
            chunkFilename: "bundle/[id].css"
        })
    ]
};
