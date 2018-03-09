const path = require('path');
const webpack = require('webpack');
const sourcePath = path.join(__dirname, './App');
const destPath = path.join(__dirname, './App/dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {    
    context: sourcePath,
    devtool: 'inline-source-map',
    //mode: 'development', //webpack 4 only
    entry: {
        app: sourcePath + '/app.ts',
        vendor: [
            'angular/angular.js',
            '@uirouter/core/_bundles/ui-router-core.js',
            '@uirouter/angularjs/release/ui-router-angularjs.js',
            'angular-sanitize/angular-sanitize.js',
            'angular-animate/angular-animate.js',
            'angular-ui-bootstrap/dist/ui-bootstrap.js',
            'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'angular-jwt/dist/angular-jwt.js',
            'angular-resource/angular-resource.js',
            'moment/moment.js',
            'ui-select/dist/select.js'
        ]
    },

    output: {
        path: destPath,
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'awesome-typescript-loader'
                ]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('app.css')
    ],

    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            sourcePath
        ]
    }
    //devServer: {
    //    contentBase: path.join(__dirname, "dist"),
    //    compress: true,
    //    port: 9001
    //},
};