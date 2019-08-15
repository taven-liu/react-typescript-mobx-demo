import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const cssUse = [MiniCssExtractPlugin.loader].concat('css-loader')
const cssUseDebug = ['style-loader', 'css-loader']

export default (env = {}, argv) => {
  const isProductionMode = argv.mode === 'production'
  return {
    target: 'web',
    entry: {
      app: ['./src/index.tsx']
    },
    output: {
      filename: isProductionMode ? '[name].[hash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].[hash].js',
      publicPath: '/'
    },
    optimization: {
      minimizer: [new TerserPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: true
            }
          }
        },
        {
          test: /\.css$/,
          use: isProductionMode ? cssUse : cssUseDebug
        },
        {
          test: /\.(png|jpg|gif|woff2|svg?)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        reportFiles: ['src/**/*.{ts,tsx}']
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProductionMode ? 'production' : 'development'
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ].filter(plugin => plugin),
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      },
      hot: true,
      compress: true,
      port: 3000
    },
    devtool: isProductionMode ? 'source-map' : 'cheap-module-eval-source-map'
  }
}
