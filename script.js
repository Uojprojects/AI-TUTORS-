document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('user-form');
  const userInfoSection = document.getElementById('user-info');
  const tutorInterfaceSection = document.getElementById('tutor-interface');
  const userQuestionInput = document.getElementById('user-question');
  const askButton = document.getElementById('ask-button');
  const aiResponseDiv = document.getElementById('ai-response');

  userForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      // Basic validation (you might want more robust validation)
      if (name.trim() === '' || email.trim() === '') {
          alert('Please enter your name and email.');
          return;
      }

      // Hide user info section, show tutor interface
      userInfoSection.style.display = 'none';
      tutorInterfaceSection.style.display = 'block';
  });

  askButton.addEventListener('click', async () => {
      const question = userQuestionInput.value;

      if (question.trim() === '') {
          alert('Please enter your question.');
          return;
      }

      aiResponseDiv.textContent = 'Loading...'; // Show loading message

      const apiKey = '';

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/Gemini-2.0-Flash:generateContent`;


      fetch('https://generativelanguage.googleapis.com/v1beta/models/Gemini-2.0-Flash:generateContent?key=', {
        method: 'POST', // Or 'GET', 'PUT', etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'api key' // Or another type of authorization
        },
        body: JSON.stringify({ /* Your request payload */ }) // Only if needed (e.g., POST request)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTPS error! status: ' + response.status); // Will trigger the error at script.js:51:23
        }
        return response.json();
    })
    .then(data => {
        // Handle successful response
    })
    .catch(error => {
        // Handle the error (script.js:51:23)
    });
  });
});
