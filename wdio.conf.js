const PORT = process.env.PORT || 3000;

exports.config = {
  runner: 'local',
  specs: [
    './src/js/**/*.browser-test.js'
  ],
  maxInstances: 10,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu'],
    }
  }, {
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['-headless']
    }
  }],
  logLevel: 'error',
  bail: 0,
  sync: true,
  baseUrl: 'http://localhost:' + PORT,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver', 'geckodriver'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: 3
  }
}
