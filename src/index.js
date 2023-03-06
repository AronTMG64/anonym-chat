const express = require('express');
const path = require('path');

const server = express();

const messages = [];

server.use(express.static(path.resolve('public')));
server.use(express.json({extended: true}));

server.post('/api/messages', (req, res) => {
  messages.push(req.body);
  res.json(messages);
});

server.get('/api/messages', (req, res) => {
  res.status(200).json(messages);
});

server.listen(3000, () => console.log('Connected'));
