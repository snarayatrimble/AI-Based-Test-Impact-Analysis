const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load the trained model
async function loadModel() {
    try {
        const model = await tf.loadLayersModel('file://./test_impact_model/model.json');
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        process.exit(1);
    }
}

// Preprocess the commit diff or file contents
async function preprocessDiff(diffContent) {
    try {
        // Tokenize the diff content (or code content)
        const tokenizer = new tf.preprocessing.text.Tokenizer({ numWords: 10000 });
        tokenizer.fitOnTexts([diffContent]); // Assuming the diffContent is a string

        const sequences = tokenizer.textsToSequences([diffContent]);
        const maxLen = 50; // Ensure to pad sequences to a fixed length
        const padded = tf.preprocessing.sequence.padSequences(sequences, { padding: 'post', maxlen: maxLen });

        return padded;
    } catch (error) {
        console.error('Error processing diff:', error);
        process.exit(1);
    }
}

// Run the prediction
async function predict(model, diffContent) {
    try {
        const preprocessedInput = await preprocessDiff(diffContent);
        const prediction = model.predict(preprocessedInput);
        const predictedIndex = prediction.argMax(-1).dataSync()[0]; // Get the predicted index

        // Map the index back to a test file name
        const impactedTests = ['login.cy.js', 'navbar.cy.js', 'user.cy.js']; // Adjust this list based on your model's output classes
        const impactedTest = impactedTests[predictedIndex];

        console.log(`Predicted impacted test: ${impactedTest}`);
        return impactedTest;
    } catch (error) {
        console.error('Error making prediction:', error);
        process.exit(1);
    }
}

// Main function to load model and predict
async function main() {
    const model = await loadModel();
    const diffContent = process.env.PR_DIFF; // Fetch diff content from environment variable

    if (!diffContent) {
        console.error('No commit diff content provided');
        process.exit(1);
    }

    const impactedTest = await predict(model, diffContent); // Pass the diff content to predict
    console.log(`Impacted test based on changes: ${impactedTest}`);

    // Set the impacted test name as an output
    console.log(`::set-output name=impactedTest::${impactedTest}`);
}

// Run the main function
main();
