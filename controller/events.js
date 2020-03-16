document.addEventListener('keydown', e => {
  if (e.keyCode == 37) {
    player.pos.left --;
  } else if (e.keyCode == 39) {
    player.pos.left ++;
  } else if (e.keyCode == 40) {
    drop();
  }
})