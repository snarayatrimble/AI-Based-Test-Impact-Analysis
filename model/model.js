const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load the dataset
const data = JSON.parse(fs.readFileSync('data/test_data.json', 'utf8'));

// Create mappings for modified files and test names to integer values
const fileMapping = {};
const testMapping = {};
let fileIndex = 0;
let testIndex = 0;

// Create mappings and preprocess the dataset
data.forEach(entry => {
  entry.modified_files.forEach(file => {
    if (!fileMapping[file]) {
      fileMapping[file] = fileIndex++;
    }
  });
  entry.test_names.forEach(test => {
    if (!testMapping[test]) {
      testMapping[test] = testIndex++;
    }
  });
});

// Preprocess data to ensure consistent shape
const X = data.map(entry => {
  const filesEncoded = entry.modified_files.map(file => fileMapping[file] || 0);  // Default to 0 if file not in mapping
  const testsEncoded = entry.test_names.map(test => testMapping[test] || 0);  // Default to 0 if test not in mapping
  return [...filesEncoded, ...testsEncoded];
});

const y = data.map(entry => entry.outcome);

// Log the shape of X to verify consistency
console.log('Shape of X:', X[0].length);

// Ensure the input shape matches the number of features expected by the model
const X_tensor = tf.tensor2d(X);
const y_tensor = tf.tensor2d(y, [y.length, 1]);

// Build the model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [X[0].length] }));
model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

// Compile the model
model.compile({
  optimizer: 'adam',
  loss: 'binaryCrossentropy',
  metrics: ['accuracy']
});

// Train the model
async function trainModel() {
  await model.fit(X_tensor, y_tensor, {
    epochs: 10,
    batchSize: 8
  });
  console.log('Model trained!');
  // Save the model and mappings
  await model.save('file://model');
  fs.writeFileSync('model/fileMapping.json', JSON.stringify(fileMapping, null, 2));
  fs.writeFileSync('model/testMapping.json', JSON.stringify(testMapping, null, 2));
}

trainModel();
