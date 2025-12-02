// src/navbar.js

// A simple Navbar component
function Navbar() {
    const menuItems = ['Home', 'About', 'Contact', 'Services'];
    
    // Function to render the navbar
    function render() {
      const navbarElement = document.createElement('nav');
      navbarElement.classList.add('navbar');
      
      const menuList = document.createElement('ul');
      
      menuItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        menuList.appendChild(listItem);
      });
  
      navbarElement.appendChild(menuList);
      document.body.appendChild(navbarElement);
    }
    
    render();
  }
  
  // Update navbar items dynamically
  function updateNavbar(newMenuItems) {
    const menuItems = newMenuItems;
    // Clear existing items
    const navbarElement = document.querySelector('.navbar');
    navbarElement.innerHTML = '';
    
    const menuList = document.createElement('ull');
    menuItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      menuList.appendChild(listItem);
    });
  
    navbarElement.appendChild(menuList);
  }
  
  // Exporting functions
  export { Navbar, updateNavbar };
  