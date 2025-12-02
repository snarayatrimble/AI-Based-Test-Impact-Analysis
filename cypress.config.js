module.exports = {
    e2e: {
      setupNodeEvents(on, config) {
        return require('./cypress/plugins/index.js')(on, config);
      },
    "chromeWebSecurity": false,
    "reporter": "cypress-multi-reporters",
    "CYPRESS_DISABLE_ATOM_CACHE": true,
    "screenshotOnRunFailure":true,
    "pageLoadTimeout":60000,
    "env": {
      "landingpageurl":"https://portal.dev.trimbletl.com/",
    },
    "reporterOptions": {
        "reporterEnabled": "mochawesome",
        "mochawesomeReporterOptions": {
            "reportDir": "cypress/reports",
            "quite": true,
            "overwrite": false,
            "html": true,
            "json": true,
            "screenshots": {
          "takeOnSuccess": true,
          "takeOnFailure": true,
          "fullPage": true
        },
        },
        "screenshotsFolder":"/cypress/screenshots/*",
        
  },
  
    "viewportWidth": 1600,
    "video": true,
    "viewportHeight": 1200
  }
  };