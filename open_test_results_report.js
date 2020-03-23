const open = require('open');

(async () => {
  // Specify app arguments.
  await open('./cypress/reports/integration/public/report.html', {
    app: ['google chrome', '--incognito']
  });
})();
