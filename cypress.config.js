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
      "landingpageurl":"https://stage.id.trimblecloud.com/oauth/authorize?scope=openid%20followup_web_dev&response_type=code&client_id=62627737-4dcd-4674-9b1b-fe0057f25358&identity_provider=trimble_automation&redirect_uri=https://fleetcockpitplus.dev.trimbletl.com/",
      "LoadTestlandingpageurl":"https://id.nonprod.trimbletl.com/realms/loadtest/protocol/openid-connect/auth?scope=openid&response_type=code&redirect_uri=https%3A%2F%2Ffleetcockpitplus.loadtest.trimbletl.com%2F&client_id=fleetcockpitplus&code_challenge=nf1zRfFxQoqWd4nRctBkjZ6CZfB7MDr-nhE-aVB7BwA&code_challenge_method=S256",
      "Device":"pc-testvehicle03",
      "Customer":"Shelter",
      "CustomerDevice":"CC3 Test Swami",
      "TranslationVehicleDeviceName" : "CC3 Testing Dev"
    },
    "reporterOptions": {
        "reporterEnabled": "mochawesome",
        "mochawesomeReporterOptions": {
            "reportDir": "cypress/reports",
            "quite": true,
            "overwrite": false,
            "html": false,
            "json": true
        },
        "screenshotsFolder":"/cypress/screenshots/*"
  },
  
    "viewportWidth": 1600,
    "viewportHeight": 1200,
    "screenshotsFolder": "screenshots"
    
  }
  };