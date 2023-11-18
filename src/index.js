const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const mongodbConnection = require("./config/db");
const chatController = require("./controllers/chatController");
require("dotenv").config();

// Create server
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// DB connection
mongodbConnection();

// Socket connection
wss.on("connection", (ws) => {
  console.log('A user connected');

  // Start the listen message event
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "joinGroup":
        chatController.joinGroup(wss, ws, data.group, data.userName);
        break;
      case "sendMessage":
        chatController.sendMessage(wss, data);
        break;
      default:
        break;
    }
  });

  // close the socket connection
  ws.on("close", () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
