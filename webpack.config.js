const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

function scanerFiles(directory, filetype) {
  const arrayFiles = [];
  const items = fs.readdirSync(directory);

  for (let i = 0; i < items.length; i += 1) {
    const stat = fs.statSync(path.join(directory, items[i]));
    if (!stat.isDirectory() && items[i].endsWith(filetype)) {
      arrayFiles.push(path.join(directory, items[i]));
    } else if (stat.isDirectory() && !items[i].startsWith('_')) {
      arrayFiles.push(...scanerFiles(path.join(directory, items[i]), filetype));
    }
  }
  return arrayFiles;
}

const PAGES_DIR = path.join(PATHS.src, 'pages');
const PAGES = scanerFiles(PAGES_DIR, '.pug');
const PAGES_ENTRY = scanerFiles(PAGES_DIR, '.js');

const cssLoader = (addition) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'autoprefixer',
            ],
          ],
        },
      },
    },
  ];
  if (addition) {
    loaders.push(addition);
  }
  return loaders;
};

module.exports = (env, options) => ({
  entry: ['@babel/polyfill', '/src/index.js', ...PAGES_ENTRY],
  output: {
    filename: 'bundle_[id].js',
    path: PATHS.dist,
  },
  devtool: options.mode === 'production' ? false : 'eval-cheap-module-source-map',
  resolve: {
    alias: {
      Root: PATHS.src,
      Blocks: path.join(PATHS.src, 'blocks'),
    },
  },
  plugins: [
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: page,
      filename: `${path.basename(page).replace(/\.pug/, '.html')}`,
    })),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style_[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(PATHS.dist, 'public'),
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoader(),
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      },
      {
        test: /\.(scss|sass)$/,
        use: cssLoader('sass-loader'),
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        exclude: /fonts/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'public/images',
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.(ttf|woff|woff2|svg|eot)$/,
        include: /fonts/,
        loader: 'file-loader',
        options: {
          outputPath: 'public/fonts',
          name: '[name]/[name].[ext]',
        },
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
});
