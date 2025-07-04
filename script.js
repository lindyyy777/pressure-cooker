const btn = document.getElementById('holdBtn');
const timer = document.getElementById('timer');
const nameInput = document.getElementById('name');
const scoresList = document.getElementById('scores');

let startTime, interval;

btn.addEventListener('mousedown', start);
btn.addEventListener('touchstart', start);
btn.addEventListener('mouseup', stop);
btn.addEventListener('touchend', stop);

function start() {
  startTime = Date.now();
  interval = setInterval(() => {
    let t = (Date.now() - startTime) / 1000;
    timer.textContent = t.toFixed(2) + 's';
  }, 50);
}

function stop() {
  clearInterval(interval);
  let duration = (Date.now() - startTime) / 1000;
  timer.textContent = duration.toFixed(2) + 's';

  const name = nameInput.value || 'Anonymous';
  fetch('/submit', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, duration })
  }).then(loadScores);
}

function loadScores() {
  fetch('/leaderboard')
    .then(res => res.json())
    .then(scores => {
      scoresList.innerHTML = '';
      scores.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.name}: ${s.duration.toFixed(2)}s`;
        scoresList.appendChild(li);
      });
    });
}

loadScores();
