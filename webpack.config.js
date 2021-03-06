const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass'
];

module.exports = {
  entry: './main.js',
  output: {
    filename: 'application.js',
    path: path.join(__dirname, './assets')
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.cjsx$/, loader: 'coffee-loader!cjsx-loader' },
      { test: /\.(jpeg|jpg|png|svg|gif)$/, loader: 'url-loader?limit=8192' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.sass$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react', 'es2015'] } }
    ]
  },
  plugins: [
    new ExtractTextPlugin('application.css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.json', '.sass', '.cjsx', '.coffee']
  }
};
