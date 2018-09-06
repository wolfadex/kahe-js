const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = () => {
  return {
    mode: isProduction ? 'production' : 'development',
    entry: [
      '@babel/polyfill',
      path.resolve(__dirname, 'src/index.js'),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    modules: false,
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    legacy: true,
                  },
                ],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                [
                  'emotion',
                  {
                    hoist: isProduction,
                    sourceMaps: !isProduction,
                    autoLabel: !isProduction,
                  },
                ],
              ],
            },
          },
        },
        // {
        //   test: /.css$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //       // This plugin is similar to the css-loader for CSS Modules
        //       loader: DSSwebpackPlugin.loader,
        //       query: {
        //         // optional, adds readable classnames
        //         localIdentName,
        //       },
        //     },
        //   ],
        // },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Kahe',
      }),
      new MiniCssExtractPlugin({
        filename: 'index.css',
      }),
    ],
  };
};