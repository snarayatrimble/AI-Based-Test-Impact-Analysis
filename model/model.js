const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load and preprocess the dataset
const data = JSON.parse(fs.readFileSync('data/test_data.json', 'utf8'));

// Create mappings for modified files and test names
const fileMapping = {};
const testMapping = {};
let fileIndex = 0;
let testIndex = 0;

// Preprocess the dataset
const X = data.map(entry => {
  // Encode modified files
  const filesEncoded = entry.modified_files.map(file => fileMapping[file] || 0);
  
  // Encode test names
  const testsEncoded = entry.test_names.map(test => testMapping[test] || 0);
  
  return [...filesEncoded, ...testsEncoded];  // Ensure consistent shape
});

const y = data.map(entry => entry.outcome);

console.log('Shape of X:', X[0].length);  // Ensure consistent number of features

// Convert the data into tensors
const X_tensor = tf.tensor2d(X);
const y_tensor = tf.tensor2d(y, [y.length, 1]);

// Build the TensorFlow.js model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [X[0].length] }));  // Ensure inputShape matches
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
  await model.save('file://model');  // Save the model
}

trainModel();
