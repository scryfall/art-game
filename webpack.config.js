module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
}
};
