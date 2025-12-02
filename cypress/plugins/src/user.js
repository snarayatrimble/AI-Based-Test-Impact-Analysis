// src/user.js

// Simulate a user authentication system
function authenticateUser(username, password) {
    // Dummy authentication (just a simple check)
    if (username === 'admin' && password === 'password123') {
      return true;
    }
    return false;
  }
  
  // Fetch user data (could be from an API)
  async function fetchUserData(userId) {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId === 1) {
          resolve({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
        } else {
          reject('User not found');
        }
      }, 1000);
    });
  }
  
  // Update user information
  function updateUserInformation(userId, newInfo) {
    // Simulate updating user information (e.g., name, email)
    console.log(`Updating user ${userId}'s info to:`, newInfo);
    return true;
  }
  
  // Export functions
  export { authenticateUser, fetchUserData, updateUserInformation };
  