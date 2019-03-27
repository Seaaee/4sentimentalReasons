const path=require('path')
const webpack =require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const ROOT=path.resolve(__dirname)
const RAW=path.resolve(ROOT,'raw')
const OUT=path.resolve(ROOT,'done')
const CleanWebpackPlugin=require('clean-webpack-plugin')
module.exports = {
    entry: {
        qqq:path.resolve(RAW,'qqq.js'),
        app:path.resolve(RAW,'kk.js'),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'done')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|gif|svg)$/i,
                use:['file-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'pluginthml',
            template:path.resolve(RAW,'main.html'),
            filename:'dc.html',
            favicon: path.resolve(RAW, 'title.JPG'),
        }),
        new CleanWebpackPlugin()
    ],
    externals:{
        "jquery":"jQuery"
    }
};