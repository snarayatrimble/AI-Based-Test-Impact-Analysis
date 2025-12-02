module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  "chromeWebSecurity": false,
  "CYPRESS_DISABLE_ATOM_CACHE": true,
  "screenshotOnRunFailure":true,
  "pageLoadTimeout":60000,
  "env": {
    "applicationurl":"https://fleetcockpitplus.stg.trimbletl.com/",
    "Device": "pc-testvehicle03",
    "Customer":"Autotest04",
    "CustomerDevice":"Test Unit",
    "TranslationVehicleDeviceName" : "pc-testvehicle03"
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
      },
      },
      "screenshotsFolder":"/cypress/screenshots/*",
      
},

  "viewportWidth": 1600,
  "video": true,
  "viewportHeight": 1200
}
};