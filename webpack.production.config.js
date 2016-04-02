var path = require('path');
var webpack = require('webpack');

module.exports = {
    //The entry point for the bundle.
    entry: {
        app: [
            './lib/index.js'
        ],
    },
    //Options affecting the output of the compilation
    output: {
        path: path.join(__dirname, './public/js/'),
        filename: `app.js`,
        publicPath: '/js/'
    },
    // Add additional plugins to the compiler.
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({}),
    ],
    //Include polyfills or mocks for various node stuff:
    node: {
        fs: "empty"
    },
    //Options affecting the resolving of modules.
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        },
        extensions: ['', '.js']
    },
    //Like resolve but for loaders.
    resolveLoader: {
        'fallback': path.join(__dirname, 'node_modules')
    },
    //Options affecting the normal modules 
    module: {
      //An array of automatically applied loaders.
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/,
            include: [path.join(__dirname, './lib')]
        }, {
            test: /\.xml$/,
            loader: "raw"
        }, {
            test: /\.json$/,
            loaders: ['json-loader']
        }, {
            test: /\.css?$/,
            loaders: ['style', 'raw'],
            include: __dirname
        }]
    }
};