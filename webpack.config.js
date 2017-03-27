const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.mode;

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const libraryName = 'ReactNebo15Events';

const plugins = [];
let outputFile;

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    compressor: {
      pure_getters: true, // eslint-disable-line
      unsafe: true,
      unsafe_comps: true, // eslint-disable-line
      screw_ie8: true, // eslint-disable-line
      warnings: false,
    },
  }));
  outputFile = 'react-nebo15-events.min.js';
} else {
  outputFile = 'react-nebo15-events.js';
}

const config = {
  externals: {
    react: reactExternal,
  },
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
  },
  plugins,
};

module.exports = config;
