const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

let scores = [];

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const { name, duration } = req.body;
  if (!name || !duration) return res.status(400).send('Invalid');
  scores.push({ name, duration, time: Date.now() });
  scores.sort((a, b) => b.duration - a.duration);
  scores = scores.slice(0, 10); // keep top 10
  res.sendStatus(200);
});

app.get('/leaderboard', (req, res) => {
  res.json(scores);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
