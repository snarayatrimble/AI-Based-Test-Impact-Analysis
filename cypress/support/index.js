// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************


if (!('structuredClone' in window)) {
    window.structuredClone = (data) => {
        return Cypress._.cloneDeep(data);
    };
  }
  
  // Import commands.js using ES2015 syntax:
  
  import { addReporter } from 'mochawesome';
  
  addReporter({
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'reports',
      overwrite: true,
      html: true,
      json: true,
      screenshots: {
        takeOnSuccess: true,
        takeOnFailure: true,
        path: 'screenshots'
      }
    }
  });
  

  //import '@cypress/code-coverage/support'

  // Import for cypress-xpath
import 'cypress-xpath';

// Import for mochawesome (if you're using it in your test reporting)
import mochawesome from 'mochawesome/addContext';

// Import for cypress-wait-until
import 'cypress-wait-until';

  
   const path = require( 'path' ),
      logPath = process.env.LOG_DIR || path.join( __dirname, '..', 'log' );
  
  module.exports = ( on, config ) => {
  
      config.screenshotsFolder = path.join( logPath, 'screenshots' );
      return config;
  };
  
  
  
  Cypress.on('test:after:run', (test, runnable) => {
  
      if (test.state === 'passed') {
          const screenshot = `${Cypress.config('screenshotsFolder')}/${
            Cypress.spec.name
          }/${test.title} -- after each hook.png`;
          addContext({ test }, screenshot);
        }  
    if (test.state === 'failed') {
      const screenshot = `${Cypress.config('screenshotsFolder')}/${
        Cypress.spec.name
      }/ ${test.title} -- after each hook.png`;
      addContext({ test }, screenshot);
    }
  });
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  // Alternatively you can use CommonJS syntax:
  // require('./commands')