const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const apiKey = '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';  // Replace with your actual API key

function appendMessage(role, text) {
    const message = document.createElement('div');
    message.className = role;
    message.textContent = text;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage() {
    const userMessage = userInput.value;
    appendMessage('user', userMessage);
    userInput.value = '';

    // Call OpenAI GPT API to get the chatbot's response
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        const chatbotResponse = data.choices[0].text.trim();
        appendMessage('chatbot', chatbotResponse);
    })
    .catch(error => console.error('Error:', error));
}
