const canvas = document.querySelector('#tetris');
const ctx = canvas.getContext('2d');

ctx.scale(20, 20);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
]

const player = {
  pos: { left: 5, top: 5 },
  matrix: matrix
}

const draw = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

const drawMatrix = (matrix, { left, top }) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x + left, y + top, 1, 1);
      }
    })
  });
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
const update = (time = 0) => {
  const currTime = time - lastTime;
  lastTime = time;

  dropCounter += currTime;

  if (dropCounter > dropInterval) {
    player.pos.top ++;
    dropCounter = 0;
  }
  draw();
  requestAnimationFrame(update);
}

update()

draw();