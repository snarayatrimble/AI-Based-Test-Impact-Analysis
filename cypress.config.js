const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/integration/**/*.spec.js',
    supportFile: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: false,
      json: true,
    },
  },
  "env": {
    "landingpageurl":"https://fleetcockpitplus.stg.trimbletl.com/",
    "Device": "pc-testvehicle03",
    "Customer":"Autotest04",
    "CustomerDevice":"Test Unit",
    "TranslationVehicleDeviceName" : "pc-testvehicle03"
  },
});