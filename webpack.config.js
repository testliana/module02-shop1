const path = require('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8088,
  }
};

module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production',
  entry: './srс/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: './srс/index.html'
    }),
    new MiniCssExtractPlugin ({
      filename: './styles/main.css'
    })
  ],
  module: {
    rules: [
    {
    test: /\.(?:ico|png|jpeg|jpg|svg)$/i,
    type: 'asset/inline'
    },
    {
       test: /\.html$/i,
       loader: 'html-loader'
    },
    {
       test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
      ]
    },
    {
       test: /\.scss$/i,
        use: [
        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
    },
  ]
},
...devServer(develop),
});