const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: path.resolve(__dirname, "..","src","index.jsx");
    module:{
        rules:[

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..","public","index.html"),
            inject:true
        })
    ]
}