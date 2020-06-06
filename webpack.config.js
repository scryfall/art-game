module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    },
  },
};
