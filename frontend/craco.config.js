const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "fs": false,
          "path": require.resolve("path-browserify"),
          "process": require.resolve("process/browser"),
          "buffer": require.resolve("buffer/"),
          "util": require.resolve("util/"),
          "stream": require.resolve("stream-browserify"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "net": false,
          "os": false,
          "child_process": false,
          "readline": false,
          "url": require.resolve("url/")
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
      ]
    }
  }
};