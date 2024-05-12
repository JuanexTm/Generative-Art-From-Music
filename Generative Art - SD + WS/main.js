const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();

app.use(express.static("public"));

const serverPort = process.env.PORT || 3000;
const server = http.createServer(app);

// Iniciar WebSocket server en el mismo servidor HTTP
const wss = new WebSocket.Server({ server });

server.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
});

wss.on('connection', function connection(ws) {
    console.log("Connection Opened");
    console.log("Client size: ", wss.clients.size);

    if (wss.clients.size === 1) {
        console.log("First connection. Starting keepalive");
        keepServerAlive();
    }

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        const messageText = message.toString();

        if (messageText=== 'pong') {
            console.log('KeepAlive');
            return;
        }
        broadcast(ws, messageText, false);
    });

    ws.on('close', function () {
        console.log("Closing connection");

        if (wss.clients.size === 0) {
            console.log("Last client disconnected, stopping keepAlive interval");
            clearInterval(keepAliveId);
        }
    });
});

const broadcast = (ws, message, includeSelf) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN && (includeSelf || client !== ws)) {
            client.send(message);
        }
    });
};

let keepAliveId;
const keepServerAlive = () => {
    keepAliveId = setInterval(() => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('ping');
            }
        });
    }, 50000);
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});
