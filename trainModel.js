// trainModel.js

const tf = require('@tensorflow/tfjs-node');

// Define the training data
const trainingData = [
  {input: [1, 0, 0], output: [1]}, // login.component.ts changed -> login.spec.js likely fails
  {input: [0, 1, 0], output: [0]}, // navbar.component.ts changed -> navbar.spec.js likely passes
  {input: [0, 0, 1], output: [1]}, // user.service.ts changed -> login.spec.js likely fails
];

// Prepare training data tensors
const xs = tf.tensor2d(trainingData.map(d => d.input)); // Features (changed files)
const ys = tf.tensor2d(trainingData.map(d => d.output)); // Labels (test outcomes)

// Build a neural network model
const model = tf.sequential();
model.add(tf.layers.dense({units: 10, inputShape: [3], activation: 'relu'})); // 3 input features (files)
model.add(tf.layers.dense({units: 1, activation: 'sigmoid'})); // 1 output (test pass/fail)

// Compile the model
model.compile({optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy']});

// Train the model
(async () => {
  await model.fit(xs, ys, {epochs: 100});
  console.log('Model trained successfully');

  // Save the model for later use
  await model.save('file://./test-impact-model');

  // Example prediction (predicting for a new commit)
  const prediction = model.predict(tf.tensor2d([[1, 0, 0]])); // Predicting impact for login.component.ts change
  prediction.print(); // This should print a value close to 1 (test failure)
})();
