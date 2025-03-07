const { override, addWebpackPlugin, addWebpackResolve } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackResolve({
    resolve: {
      fallback: {
        process: require.resolve('process/browser'),
      },
    },
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "process": require.resolve("process/browser"),
      "buffer": require.resolve("buffer")
    }
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  )
  
);