import webpack from 'webpack';
import Config from 'webpack-config';
const CompressionPlugin = require('compression-webpack-plugin');
const ChangeExtensionPlugin = require('change-extension-plugin');

export default new Config().extend('webpack.base.config.js').merge({
    output: {
        filename: 'index.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        // new ChangeExtensionPlugin(
        //     {
        //         extensions: ['js', 'css'],
        //         compressionMethod: 'gz',
        //     }
        // ),
    ]
});