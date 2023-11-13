// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// data
const commentsByPostId = {};

// routes
app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];

  res.status(200).json(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[id] = comments;

  res.status(201).json(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});