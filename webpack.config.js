var webpack = require('webpack');
var path = require('path');
const autoprefixer = require('autoprefixer');
const glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NunjucksWebpackPlugin = require("nunjucks-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var SvgStore = require('webpack-svgstore-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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

const pages = glob.sync('**/*.njk', {
    cwd: path.join(basePath, 'html/pages/'),
    root: '/',
}).map(page =>
    new HtmlWebpackPlugin({
        filename: path.join(basePath, '/assets/html/'+page.slice(0,-4)+'_page.html'),
        template: `html/pages/${page}`,
    })
);

module.exports = {
    context: __dirname,
    entry: {
        scripts: ["./build.js"],
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
            { test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/, loader: 'file-loader?name=fonts/[name].[ext]?[hash]'},

            { test: /\.png|\.jpe?g|\.gif$/, loader: 'file-loader?name=img/[name].[ext]?[hash]'},

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options : { autoprefixer: false, sourceMap: true, importLoaders: 1}
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {keepQuery:true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 10', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap:true}
                        }
                    ]
                })
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
        new SvgStore({
            // svgo options
            svgoOptions: {
                plugins: [
                    { removeTitle: true }
                ]
            },
            prefix: 'icon'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { }
        })

    ],
    externals: {
    },
};