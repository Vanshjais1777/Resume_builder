const { response } = require("express");

document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // You can collect form data here and perform further actions, like sending it to a server.
    // Example:
    const formData = new FormData(this);
    
    fetch('/submit', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Log response from the server
    })
    .catch(error => {
      console.error('Error:', error);

    });
  });