const width = 600;
const height = 600;
const ctx = canvas.getContext('2d');
const blockSize = 30;
const keys = [];
const player = {
  x: 8,
  y: 1,
};
const wall = new Image();
wall.src = 'images/wall.png';

const hero = new Image();
hero.src = 'images/down.png';

const pill1 = new Image();
pill1.src = 'images/pill1.png';

const pill2 = new Image();
pill2.src = 'images/pill2.png';

const pill3 = new Image();
pill3.src = 'images/pill3.png';

const pill4 = new Image();
pill4.src = 'images/pill4.png';

const fruit1 = new Image();
fruit1.src = 'images/fruit1.png';

const fruit2 = new Image();
fruit2.src = 'images/fruit2.png';

const tea = new Image();
tea.src = 'images/tea.png';

const pills = [];

const scoreElement = document.getElementById('score');
let score = 0;

const timeElement = document.getElementById('time');
let time = 0;

canvas.width = width;
canvas.height = height;

const board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const generateBoard = () => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
  for (let i = 0; i < pills.length; i++) {
    ctx.drawImage(
      pills[i].imageObject,
      pills[i].x * blockSize,
      pills[i].y * blockSize,
      blockSize,
      blockSize,
    );
  }
};

const canMove = (x, y) => {
  return (
    y >= 0 &&
    y < board.length &&
    x >= 0 &&
    x < board[y].length &&
    board[y][x] != 1
  );
};

const movement = (e) => {
  if (keys[38] && canMove(player.x + 1, player.y)) {
    // šipka doprava
    hero.src = 'images/right.png';
    player.x++;
  }

  if (keys[40] && canMove(player.x - 1, player.y)) {
    // šipka doleva
    hero.src = 'images/left.png';
    player.x--;
  }

  if (keys[37] && canMove(player.x, player.y - 1)) {
    // šipka nahoru
    hero.src = 'images/up.png';
    player.y--;
  }

  if (keys[39] && canMove(player.x, player.y + 1)) {
    // šipka dolů
    hero.src = 'images/down.png';
    player.y++;
  }
};

const draw = (e) => {
  ctx.clearRect(
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize,
  );
  generateBoard();
  movement();
  collect();
  ctx.drawImage(
    hero,
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize,
  );
};

const createPills = () => {
  pills.push({
    x: 1,
    y: 1,
    imageObject: pill1,
  });

  pills.push({
    x: 1,
    y: 15,
    imageObject: pill2,
  });

  pills.push({
    x: 14,
    y: 12,
    imageObject: pill3,
  });

  pills.push({
    x: 15,
    y: 18,
    imageObject: pill4,
  });

  pills.push({
    x: 5,
    y: 11,
    imageObject: fruit1,
  });

  pills.push({
    x: 18,
    y: 5,
    imageObject: fruit2,
  });

  pills.push({
    x: 8,
    y: 4,
    imageObject: tea,
  });
};

const startGame = () => {
  time = 60;
  createPills();
  draw();
};

const collect = () => {
  for (let i = 0; i < pills.length; i++) {
    if (player.x == pills[i].x && player.y == pills[i].y) {
      pills.splice(i, 1);
      increaseScore();
    }
  }
};

const increaseScore = () => {
  score++;
  scoreElement.textContent = `${score}/6`;
};

const timer = () => {
  const startTimer = () => {
    let timer = time;
    let minutes = 0;
    let seconds = 0;
  };
  startTimer();
};

window.addEventListener('load', startGame);

document.body.addEventListener('keydown', (e) => {
  keys[e.code] = true;

  draw();
});

document.body.addEventListener('keyup', (e) => {
  keys[e.code] = false;

  draw();
});
