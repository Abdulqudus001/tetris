const clearLine = () => {
  let rowCount = 1;
  outer: for (let y = field.length - 1; y > 0; --y) {
    for (let x = 0; x< field[y].length; ++x) {
      if (!field[y][x]) {
        continue outer;
      }
    }
    const row = field.splice(y, 1)[0].fill(0);
    field.unshift(row);
    ++y;
    scoreCounter += rowCount * 10;
    rowCount *= 2;
  }

}