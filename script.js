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

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;


        try {
            const response = await fetch('/api/gemini', { // Send the request to your server's endpoint
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question }), // Send the question in the body
              });
          
              if (!response.ok) {
                throw new Error(`HTTPS error! status: ${response.status}`);
              }
          
              const data = await response.json();
              // Process the response from the server
              console.log(data.answer)

        
    
        } catch(error) {
            // Handle any errors during fetch
            console.error('Error fetching AI response:', error);
            aiResponseDiv.textContent = 'Error fetching answer. Please try again later.';
          };
    });
});