module.exports = {
  browserContext: 'incognito',
  launch: {
      args: ['--enable-features=NetworkService', '--no-sandbox', '--disable-dev-shm-usage'],
      headless: true,
      dumpio: true,
      ignoreHTTPSErrors: true
  }
};