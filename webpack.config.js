var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        scripts: ["./build/index.js"],
        styles: ["./scss/style.scss"]
    },

    output: {
        libraryTarget: "umd",
        library: "friday",
        filename: '[name].js',
        path: path.resolve(__dirname, './assets')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, enforce: "pre", loader: "source-map-loader" },

            { test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/, loader: 'file-loader?name=fonts/[name].[ext]?[hash]'},

            { test: /\.png|\.jpe?g|\.gif$/, loader: 'file-loader?name=img/[name].[ext]?[hash]'},

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!resolve-url-loader?keepQuery!sass-loader?sourceMap'})
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        ]
    },
    plugins:[
        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    externals: {
    },
};