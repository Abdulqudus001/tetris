const canvas = document.querySelector('#tetris');
const ctx = canvas.getContext('2d');

ctx.scale(20, 20);

const player = {
  pos: { left: 0, top: 0 },
  matrix: null
}

let scoreCounter = 0;
const score = document.querySelector('#score');

const draw = () => {
  score.textContent = scoreCounter;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(field, { left: 0, top: 0 });
  drawMatrix(player.matrix, player.pos);
}

const createMatrix = (width, height) => {
  const matrix = [];
  while (height--) {
    matrix.push(Array(width).fill(0));
  }
  return matrix;
}

const drawMatrix = (matrix, { left, top }) => {
  const colors = ['purple', 'yellow', 'orange', 'blue', 'cyan', 'green', 'red']
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = colors[value - 1];
        ctx.fillRect(x + left, y + top, 1, 1);
      }
    })
  });
}

const collide = (arena, player) => {
  const [matrix, offset] = [player.matrix, player.pos];
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[i].length; ++j) {
      if (matrix[i][j] &&
        (arena[i + offset.top] &&
          arena[i + offset.top][j + offset.left]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

const field = createMatrix(12, 20);

const drawBlockOnField = (field, block) => {
  const { left, top } = block.pos;
  block.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        field[y + top][x + left] = value;
      }
    })
  })
}

const playerMove = direction => {
  player.pos.left += direction;
  if (collide(field, player)) {
    player.pos.left -= direction;
  }
}

let dropCounter = 0;
let dropInterval = 1000;
let isPaused = false;

let lastTime = 0;
const update = (time = 0) => {
  const currTime = time - lastTime;
  lastTime = time;

  dropCounter += currTime;

  if (dropCounter > dropInterval) {
    drop();
  }
  draw();
  if (!isPaused) {
    requestAnimationFrame(update);
  }
}

const hardDrop = () => {
  while(!collide(field, player)) {
    player.pos.top++;  
  }

  if (collide(field, player)) {
    player.pos.top--;
  }
} 

const drop = () => {
  player.pos.top++;
  if (collide(field, player)) {
    player.pos.top--;
    drawBlockOnField(field, player);
    playerReset();
    clearLine();
  }
  dropCounter = 0;
}

const playerRotate = dir => {
  const positionLeft = player.pos.left;
  let offset = 1;
  rotate(player.matrix, dir);   
  while (collide(field, player)) {
    player.pos.left += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.left = positionLeft;
      return;
    }
  }
}

const rotate = (matrix, dir) => {
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < i; ++j) {
      [
        matrix[j][i],
        matrix[i][j]
      ] = [
          matrix[i][j],
          matrix[j][i]
        ]
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse()
  }
}

playerReset()
update()

draw();