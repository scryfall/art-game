// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
  ],
  moduleNameMapper: {
    "^vue$": 'vue/dist/vue.js'
  },
  roots: [
    "<rootDir>/src/js"
  ],
  testEnvironment: "jest-environment-jsdom-sixteen",
  transform: {},
};
