/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const prod = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: __dirname + '../../wwwroot/js',
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devtool: prod ? undefined : 'source-map',
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            process: {
                env: {
                    API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
                    CDN_ENDPOINT: JSON.stringify(process.env.CDN_ENDPOINT),
                    UPLOAD_ENDPOINT: JSON.stringify(
                        process.env.UPLOAD_ENDPOINT,
                    ),
                    BUILD_VERSION: JSON.stringify(
                        `suprmoji-react-spa@${
                            require('./package.json')['version']
                        }`,
                    ),
                },
            },
        }),
    ],
};
