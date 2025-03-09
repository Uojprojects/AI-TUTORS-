document.getElementById('sendbtn').addEventListener('click', sendMessage);

async function sendMessage() {
    const inputField = document.getElementById('input');
    const userMessage = inputField.value;

    // Displaying userMessage in the chatbox
    displayMessage('You: ' + userMessage, 'user');
    inputField.value = '';

    // Send message to AI
    const response = await fetchAIResponse(userMessage);
    if (response) { // Only display if we got a valid response
        displayMessage('AI: ' + response, 'ai');
    }
}

function displayMessage(message, sender) {
    const answerArea = document.getElementById('income');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', sender === 'user' ? 'outgoing' : 'incoming'); // Add classes for styling
    answerArea.appendChild(messageElement);
    answerArea.scrollTop = answerArea.scrollHeight;
}

async function fetchAIResponse(userMessage) {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDU8S8z1d7R7Cf9ZxdEyCYqjucbueoKHsA', { //REPLACE WITH YOUR API KEY
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: userMessage
                    }]
                }]
            })
        });

        if (!response.ok) { // Check for a successful response
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`); // Include status in error message
        }

        const data = await response.json();

        // Check if the response has the expected structure
        if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Unexpected API response structure:', data);
            return 'Sorry, I received an unexpected response from the AI.'; // More specific error
        }

    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'Sorry, I could not get a response from AI.  Check the console for details.'; // More informative error for the user
    }
}
