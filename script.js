// Seleccionamos las pantallas y el botón
const pantallaInicio = document.getElementById("pantallaInicio");
const pantallaChat = document.getElementById("pantallaChat");
const pantallaPrincipal = document.getElementById("pantalla-principal");
const btnInicio = document.getElementById("btnInicio");

btnInicio.addEventListener("click", () => {
    pantallaInicio.style.display = "none";
    pantallaChat.style.display = "flex";

    setTimeout(() => {
        pantallaChat.style.display = "none";
        pantallaPrincipal.classList.remove("oculto");
    }, 3000);
});

document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {
        sendMessage(userInput);
    }
});

async function sendMessage(userInput) {
    document.getElementById('opciones').classList.add('oculto');
    appendMessage(userInput, 'user-message');
    const response = await fetchLlamaApiResponse(userInput);
    appendMessage(response, 'bot-message');
    document.getElementById('user-input').value = '';
}

function appendMessage(message, className) {
    const opcionesDiv = document.getElementById('opciones');
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    opcionesDiv.style.display = 'none';
    messagesContainer.style.display = 'flex';
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function fetchLlamaApiResponse(userMessage) {
    const apiKey = ''; // Llave
    const apiUrl = 'https://api.llama-api.com/chat/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: `Responde en español: ${userMessage}`
                }
            ],
            stream: false
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
