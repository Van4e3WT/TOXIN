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

const PAGES_DIR = path.join(PATHS.src, 'pages');

const createChunks = (pagesGroupDir) => {
  const pagesDirs = fs.readdirSync(pagesGroupDir);

  const entries = {};
  const pages = [];

  pagesDirs.forEach((pageDir) => {
    const files = fs.readdirSync(path.join(pagesGroupDir, pageDir));

    files.forEach((file) => {
      const absPath = path.join(pagesGroupDir, pageDir, file);
      const [name, type] = file.split('.');

      const isEntry = (name === pageDir) && (type === 'js' || type === 'ts');
      const isPage = (name === pageDir) && (type === 'pug');

      if (isEntry) {
        entries[pageDir] = absPath;
      }

      if (isPage) {
        pages.push(new HtmlWebpackPlugin({
          chunks: ['shared', pageDir],
          template: absPath,
          filename: `${pageDir}.html`,
        }));
      }
    });
  });

  return {
    entries,
    pages,
  };
};

const { entries, pages } = createChunks(PAGES_DIR);

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
  entry: {
    ...entries,
    shared: ['@babel/polyfill', '/src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: PATHS.dist,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  devtool: options.mode === 'production' ? false : 'eval-cheap-module-source-map',
  resolve: {
    alias: {
      Root: path.resolve(__dirname),
      Source: PATHS.src,
      Blocks: path.join(PATHS.src, 'blocks'),
    },
  },
  plugins: [
    ...pages,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
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
