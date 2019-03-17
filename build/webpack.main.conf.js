const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const computeTarget = require('./lib/computeTarget');
const config = require('./config');

const cacheLoaderOptions = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(__dirname, '../.cache-loader')
  }
};

const babelLoaderOptions = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    configFile: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: computeTarget(false, config.electronVersion)
        }
      ]
    ],
    plugins: ['@babel/plugin-proposal-object-rest-spread']
  }
};

module.exports = {
  context: config.contextPath,
  mode: config.isProduction ? 'production' : 'development',
  entry: {
    'main/index': './main/index.js',
    'main/preload': './main/preload.js'
  },
  devtool: 'source-map',
  output: {
    path: config.outPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  target: 'electron-main',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [cacheLoaderOptions, babelLoaderOptions]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(config.rootDir, './node_modules')],
    extensions: ['.js', '.jsx', '.vue', '.json', '.less', '.scss'],
    alias: {
      //
    }
  },
  plugins: [new webpack.DefinePlugin(config.defines)]
};
