module.exports = {
  moduleNameMapper: {
    "^vue$": "vue/dist/vue.js"
  },
  testEnvironment: "jest-environment-jsdom-sixteen",
  transform: {
    "^.+\\.js?$": "babel-jest"
  }
};
