const path = require('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');



module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: './'
    },
    resolve: {
      extensions: [".jsx", ".js", ".tsx", ".ts"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      
     
    ],
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                ],
                
              },
            },
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_module/,
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              
              {
                loader: "css-loader",
                options: {
                  esModule: true,
                  modules: {
                    namedExport: true,
                    localIdentName: "[name]__[local]",
                  },
                  
                  },
                },{
                  loader: 'sass-loader',
                  options: {
                  sassOptions: {
                    includePaths: ['node_modules'],
                  }
                }
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
        ],
      },
      optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin(),
        ],
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 8060,
        historyApiFallback: true,
        watchFiles: 'src/**/*',
        devMiddleware: {
          writeToDisk: true
        },
      },
      };
      