var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        hell: ["./js/index.js"],
        styles: ["./scss/style.scss"]
    },

    output: {
        libraryTarget: "umd",
        library: "friday",
        filename: '[name].js',
        path: path.resolve(__dirname, './../web/public/assets')
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
            { test: /\.css$/, use: [ 'style-loader', { loader: 'css-loader', options: { minimize: true } } ] }
        ]
    },

    plugins:[
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
        new UglifyJSPlugin()
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};