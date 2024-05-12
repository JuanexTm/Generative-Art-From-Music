let ws;

function connect() {
    // Conectar al WebSocket del servidor
    ws = new WebSocket('ws://' + window.location.hostname + ':3000');

    ws.onopen = function() {
        console.log('Conexión WebSocket abierta');
    };

    ws.onmessage = function(event) {
        console.log('Mensaje recibido: ', event.data);
        displayMessage(event.data);
    };

    ws.onerror = function(error) {
        console.log('Error WebSocket:', error);
    };

    ws.onclose = function() {
        console.log('Conexión WebSocket cerrada');
        setTimeout(connect, 1000); // Reintentar conexión
    };
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const value = messageInput.value;
    const message = JSON.stringify({value:value});

    ws.send(message);
    //messageInput.value = '';
}

function displayMessage(message) {
    const messagesElement = document.getElementById('messages');
    const messageElement = document.createElement('li');

    try {
        const data = JSON.parse(message);
    } catch (e) {
        console.log('El mensaje no es un JSON válido:', message);
    }

    messageElement.textContent = message;
    messagesElement.appendChild(messageElement);
}

window.onload = connect;
