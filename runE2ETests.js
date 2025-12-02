const { execSync } = require('child_process');
const fs = require('fs');

// Step 1: Get modified files (e.g., from a commit or PR)
const modifiedFiles = process.argv.slice(2); // Passed as command-line arguments

console.log('Modified files:', modifiedFiles);

// Step 2: Run AI-based impact prediction
const result = execSync(`node loadAndPredict.js ${modifiedFiles.join(' ')}`);
console.log(result.toString());

// Parse the output to get impacted tests
const impactedTests = result.toString().trim().split('\n')[1]?.split(':')[1].trim();

// Step 3: Run impacted Cypress tests
if (impactedTests) {
  const testsToRun = impactedTests.split(',').map(test => test.trim());

  // Running tests dynamically based on prediction
  testsToRun.forEach(test => {
    const testPath = `cypress/integration/${test.replace('.spec.js', '.cy.js')}`; // Replaces .spec.js with .cy.js
    if (fs.existsSync(testPath)) {
      console.log(`Running test: ${testPath}`);
      execSync(`npx cypress run --spec ${testPath}`);
    } else {
      console.error(`Test file not found: ${testPath}`);
    }
  });
} else {
  console.log('No impacted tests found.');
}
