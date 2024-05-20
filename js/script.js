const ground = document.querySelectorAll('.ground');
const mole = document.querySelectorAll('.mole');
const result = document.querySelector('.result');
const time = document.querySelector('.time');
const pop = document.querySelector('#pop');

let groundPrevious;
let end;
let hit = 0;
let seconds;

function randomGround(ground) {
  const t = Math.floor(Math.random() * ground.length);
  const tRandom = ground[t];
  if (tRandom == groundPrevious) {
    randomGround(ground);
  }
  groundPrevious = tRandom;
  return tRandom;
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function showMole() {
  const tRandom = randomGround(ground);
  const wRandom = randomTime(300, 1000);
  tRandom.classList.add('show');

  setTimeout(() => {
    tRandom.classList.remove('show');
    if (!end) {
      showMole();
    }
  }, wRandom);
}

function start() {
  end = false;
  hit = 0;
  seconds = 20;
  result.textContent = "Result:" + 0;
  time.textContent = "Time:" + 20 + "s";
  showMole();

  // Add event listeners
  mole.forEach(t => {
    t.addEventListener('click', track);
  });

  // Disable the start button
  var startButton = document.querySelector('.start');
  startButton.disabled = true;

  // Start the countdown
  var countdown = setInterval(function() {
    seconds--;
    time.textContent = "Time:" + seconds + "s";

    if (seconds <= 0) {
      clearInterval(countdown);
    }
  }, 1000);

  setTimeout(() => {
    end = true;

    // Remove event listeners
    mole.forEach(t => {
      t.removeEventListener('click', track);
    });

    // Enable the start button
    startButton.disabled = false;

    // Reset the timer
    clearInterval(countdown);
    time.textContent = "Time: 0s";
  }, 20000);
}

function track() {
  if (!this.parentNode.classList.contains('show')) {
    return;
  }

  hit++;
  this.parentNode.classList.remove('show');
  pop.play();
  result.textContent = "Result:" + hit;
}