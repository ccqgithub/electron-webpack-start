const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PlaceAssetsPlugin = require('html-webpack-place-assets-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const { getStyleLoaders } = require('./lib/style-loader');
const computeTarget = require('./lib/computeTarget');
const config = require('./config');

// style
const styleLoaders = getStyleLoaders({
  compress: false,
  sourceMap: true,
  extractCss: config.isProduction,
  // use vue-style-loader
  vueStyleOptions: {},
  postcssOptions: {
    config: {
      path: path.resolve(__dirname, './postcss.config.js')
    }
  },
  lessOptions: {
    strictMath: 'off'
  }
});

// cache
const cacheLoaderOptions = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(__dirname, '../.cache-loader')
  }
};

// babel
const babelLoaderOptions = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    configFile: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: computeTarget(true, config.electronVersion)
        }
      ]
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import'
    ]
  }
};

// optimization
const reVendorVue = /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/;
const reVendorCore = /[\\/]node_modules[\\/](core-js|moment)[\\/]/;
const reVendorOther = function reVendorOther(module) {
  return (
    /[\\/]node_modules[\\/]/.test(module.resource) &&
    !reVendorVue.test(module.resource) &&
    !reVendorCore.test(module.resource)
  );
};

module.exports = {
  devServer: {
    compress: true,
    port: config.port,
    hotOnly: true,
    writeToDisk: true,
    noInfo: false
  },
  context: config.contextPath,
  mode: config.isProduction ? 'production' : 'development',
  entry: {
    app: ['webpack-hot-middleware/client', './renderer/index.js']
  },
  devtool: 'source-map',
  output: {
    path: config.outPath,
    filename: 'renderer/[name].js',
    publicPath: config.publicPath,
    libraryTarget: 'commonjs2'
  },
  target: 'electron-renderer',
  externals: ['write-file-atomic', 'sqlite3'],
  resolve: {
    modules: ['node_modules', path.resolve(config.rootDir, './node_modules')],
    extensions: ['.js', '.jsx', '.vue', '.json', '.less', '.scss'],
    alias: {
      //
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [cacheLoaderOptions, babelLoaderOptions]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.less$/,
        use: styleLoaders.loaders.less
      },
      {
        test: /\.css$/,
        use: styleLoaders.loaders.css
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'renderer/imgs/[path][name].[ext]'
        }
      },
      {
        test: /\.(mp3|mp4)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'renderer/medias/[path][name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'renderer/fonts/[path][name].[ext]'
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 100000,
      maxSize: 1000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '-',
      name: false,
      cacheGroups: {
        vendors: {
          test: reVendorOther,
          priority: -10,
          name: 'vendor'
        },
        vue: {
          test: reVendorVue,
          priority: 0,
          name: 'vendor-vue'
        },
        core: {
          test: reVendorCore,
          priority: 0,
          name: 'vendor-core'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin(config.defines),
    new MonacoWebpackPlugin({
      languages: ['javascript']
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './renderer/index.html',
      filename: 'renderer/index.html',
      entry: 'app',
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: !config.isProduction
        ? 'rerender/[name].css'
        : 'rerender/[name].css',
      chunkFilename: !config.isProduction
        ? 'rerender/[id].css'
        : 'rerender/[id].css'
    }),
    new PlaceAssetsPlugin({
      headReplaceExp: /<!-- html-webpack-plugin-css -->/,
      bodyReplaceExp: /<!-- html-webpack-plugin-script -->/,
      tagsJoin: '\n  '
    })
  ].concat(
    config.isProduction ? [] : new webpack.HotModuleReplacementPlugin({})
  )
};
