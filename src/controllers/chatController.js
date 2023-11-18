const Message = require('../models/messageModel');
const getAllMessages = require('../services/message');

// Join the group evenet
const joinGroup = async (wss, ws, group, userName) => {
  ws.group = group;
  const message = `${userName} joined the group.`
  const newMessage = new Message({ group, sender: "system", message });
  await newMessage.save();
  const allMessages = await getAllMessages(group);

  ws.send(
    JSON.stringify({
      type: 'joinGroup',
      sender: 'System',
      message,
      allMessages,
    })
  );

  wss.clients.forEach((client) => {
    if (client.group === group && client !== ws) {
      client.send(
        JSON.stringify({
          type: 'joinGroup',
          sender: 'System',
          message: `${userName} joined the group.`, 
          allMessages,
        })
      );
    }
  });
};

// Send the message evenet
const sendMessage = async (wss, { group, userName, message }) => {
  const newMessage = new Message({ group, sender: userName, message });
  await newMessage.save();

  wss.clients.forEach((client) => {
    if (client.group === group) {
      client.send(
        JSON.stringify({
          type: 'sendMessage',
          group,
          sender: userName,
          message,
          createdAt: newMessage.createdAt,
        })
      );
    }
  });
};

module.exports = {
  joinGroup,
  sendMessage,
};
