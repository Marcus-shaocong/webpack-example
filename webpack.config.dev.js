/*
checkout the github link:
https://github.com/joeeames/WebpackFundamentalsCourse
use webpack-dev-server to watch files change
webpack.js.org
webpack-stats-graph
webpack -watch app/app.js app/dist/app.bundle.js
localhost:8080/webpack-dev/server

NODE_ENV=dev npm run build //start the server in dev mode

//The correct way to install bable loader
https://github.com/babel/babel-loader
npm install -D babel-loader @babel/core @babel/preset-env webpack


browserslist: checkout which browser to support

    // module:{
    //     preLoaders:[
    //         {test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}
    //     ],
    //     loaders: [
    //         {test:/\.js$/, exclude: /node_modules/, loaders:['babel-loader']},
    //         {test: /\.css$/, loaders:['style', 'css']}
    //     ]
    // },
    // resolve:{
    //     extensions:['','.js','.es6']
    // }

*/
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const codeGenConfig = require('./codegen')
//const isDev = process.env.NODE_ENV === 'development'

const baseConfig = {
    // debug: true,
    /* eval: put source-map in the same bundle.js
        sourceMappingURL=app.bundle.js.map
        source-map: has a separate map file
        hidden-source-map: hide source map from others, worry about leaking
        output.source.map file to customize the name out the output.

        base64 -D
    */
    devtool: 'inline-source-map', //other options: 'none', 'eval','eval-source-map'
    // noInfo:false,
    name:'base',
    entry:[
        path.resolve(__dirname, "src/index.js"),
    ],
    output:{
        path: path.resolve(__dirname,"dist"),
        publicPath:'/',
        filename:'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        publicPath:'/',
        watchContentBase: true,
        hot:true,
        overlay:true,
        host:"0.0.0.0"

        //disable the hotmodule replacement
        // watchContentBase: false,
        // hotOnly:true
    },
    plugins:[
        new CleanWebpackPlugin(['dist'])
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],
    // module: {
    //     rules: [
    //       {
    //         test: /\.m?js$/,
    //         exclude: /(node_modules|bower_components)/,
    //         use: {
    //           loader: 'babel-loader',
    //           options: {
    //             // presets: [['@babel/preset-env',{debug:true,
    //             //     modules:false,
    //             //     targets:{
    //             //         browsers:['last 2 chrome versions']
    //             //         // browsers:['>1%']

    //             //     }
    //             // }]]
    //           }
    //         }
    //       }
    //     ]
    // }
}

module.exports = [
    {
        name:'other',

        devtool:"source-map", //other options: 'none', 'eval','eval-source-map'
        entry:[
            path.resolve(__dirname, "src/index.js"),
        ],
        output:{
            path: path.resolve(__dirname,"dist/other"),
            publicPath:'/',
            filename:'app.bundle.js'
        },
    },
    function(env){
        let newconf = {}
        console.log("env", env)
        const isDev = env === 'development'
        console.log(`This is a ${isDev? "dev" :"prod"} build`)
        if(isDev){
            console.log("merge continue")
            newconf= merge(baseConfig, codeGenConfig,require('./babelLoader'),{
                plugins:[
                   // new NpmInstallPlugin(), //in development can auto install package if some of package is missing.
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NamedModulesPlugin(),
                    new webpack.DefinePlugin({
                        ENV_IS_DEVELOPMENT:isDev,
                        ENV_IS: JSON.stringify(isDev? "development": "production"),
                        'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
                    })
                ]
            });
            // baseConfig.plugins.push(
            //     new webpack.HotModuleReplacementPlugin())
            // baseConfig.plugins.push(
            //     new webpack.NamedModulesPlugin())              
        }else{
            return newconf= merge(baseConfig,codeGenConfig,require('./babelLoader'))
        }
       
        console.log('bc',newconf)
        return newconf;
    }
]