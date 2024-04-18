const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
// Entry point for files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // Output for our bundles
    output: {
      filename: '[name].bundle.js',
      // Tells webpack where to put our bundles
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ 
      // Webpack plugin that generates html and makes use of bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

           // Injects custom SW
           new InjectManifest({
            swSrc: './src-sw.js',
            swDest: 'src-sw.js',
          }),

            // Creates a manifest.json 
            // New instance of WebpackPwaManifest object
            new WebpackPwaManifest({
              // no hashing required for manifest = false
              fingerprints: false,
              // should be automatically injected into the HTML = true
              inject: true,
              name: 'JATE text editor',
              short_name: 'JATE',
              description: 'Just another text editor',
              background_color: '#225ca3',
              theme_color: '#225ca3',
              start_url: './',
              publicPath: './',
              icons: [
                {
                  // Icons are generated for different sizes and provides info on source of the icon (src)
                  src: path.resolve('src/images/logo.png'),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: path.join('assets', 'icons'),
                },
              ],
            }),
    

      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};
