const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.config');

config.mode = 'production';
config.devtool = undefined;
config.optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        ecma: 6,
      },
    }),
  ],
};
config.resolve.alias.vue = 'vue/dist/vue.min.js';

module.exports = config;
