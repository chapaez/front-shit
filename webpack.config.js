var webpack = require('webpack');
var path = require('path');
//const autoPrefixer = require('autoprefixer');
const glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NunjucksWebpackPlugin = require("nunjucks-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = (process.env.NODE_ENV === 'development') ? true : false;
const basePath = process.cwd();

const nunjucksContext = require('./html/data');
const nunjucksDevConfig = require('./html/config.dev.json');
const nunjucksProdConfig = require('./html/config.prod.json');

nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = JSON.stringify({
    searchPaths: basePath + '/html/',
    context: nunjucksContext
});
/*glob.sync('**!/!*.njk', {
    cwd: path.join(basePath, 'html/pages/'),
    root: '/',
}).map(page => {
    console.log(page.replace('njk', 'html'));
    console.log(`html/pages/${page}`);
});*/

const pages = glob.sync('**/*.njk', {
    cwd: path.join(basePath, 'html/pages/'),
    root: '/',
}).map(page =>
    new HtmlWebpackPlugin({
        filename: path.join(basePath, 'main.html'),
        template: `html/pages/${page}`,
    })
);



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
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            //{ test: /\.js$/, enforce: "pre", loader: "source-map-loader" },

            { test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/, loader: 'file-loader?name=fonts/[name].[ext]?[hash]'},

            { test: /\.png|\.jpe?g|\.gif$/, loader: 'file-loader?name=img/[name].[ext]?[hash]'},

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!resolve-url-loader?keepQuery!sass-loader?sourceMap'})
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            {
                test: /\.(njk|nunjucks)$/,
                loader: ['html-loader', `nunjucks-html-loader?${nunjucksOptions}`]
            },
        ]
    },
    plugins:[
        ...pages,
        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

    ],
    externals: {
    },
};