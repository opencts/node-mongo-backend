// on peut utiliser path pour indiquer le chemin vers le fichier index.js
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
    entry: './index.js',
    mode: 'production',
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    externals: [nodeExternals()],
    externalsPresets: {
        node: true
    },
    plugins: [
        new NodemonPlugin()
    ],
    devtool: 'source-map'
}