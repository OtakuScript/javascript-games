function $(select) {
  return document.querySelector(select);
}
function $$(selectAll) {
  return document.querySelectorAll(selectAll);
}

const doms = {
  chessBoard: $('.chess-board'),
};

let chesses = []; // 棋子数组
let tdWidth; // 格子宽度
let color = 'black'; // 棋子颜色
let isGameOver = false; // 游戏是否结束

function end(winnerChessArr) {
  isGameOver = true;
  for (let i = 0; i < winnerChessArr.length; i++) {
    let chess = winnerChessArr[i];
    $(`div[data-x="${chess.x}"][data-y="${chess.y}"]`).classList.add('winner');
  }
}

function checkWinner(chessPoint) {
  let winChessArr = [chessPoint];

  // 判断棋子和其各个方向上的棋子是否可以连成5个
  let chessBoardWidth = doms.chessBoard.clientWidth;
  let left = chessPoint.x / tdWidth >= 4;
  let right = (chessBoardWidth - chessPoint.x) / tdWidth >= 4;
  let up = chessPoint.y / tdWidth >= 4;
  let down = (chessBoardWidth - chessPoint.y) / tdWidth >= 4;

  // 向各个方向判断：左右上下，左上，右上，左下，右下
  if (left) {
    console.log('left');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let x = (parseFloat(chessPoint.x) - i * tdWidth).toFixed(2);
        return (
          item.x === x &&
          item.y === chessPoint.y &&
          item.color === chessPoint.color
        );
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  if (right) {
    console.log('right');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let x = (parseFloat(chessPoint.x) + i * tdWidth).toFixed(2);
        return (
          item.x === x &&
          item.y === chessPoint.y &&
          item.color === chessPoint.color
        );
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  if (up) {
    console.log('up');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let y = (parseFloat(chessPoint.y) - i * tdWidth).toFixed(2);
        return (
          item.x === chessPoint.x &&
          item.y === y &&
          item.color === chessPoint.color
        );
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  if (down) {
    console.log('down');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let y = (parseFloat(chessPoint.y) + i * tdWidth).toFixed(2);
        return (
          item.x === chessPoint.x &&
          item.y === y &&
          item.color === chessPoint.color
        );
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  if (left && up) {
    console.log('left up');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let x = (parseFloat(chessPoint.x) - i * tdWidth).toFixed(2);
        let y = (parseFloat(chessPoint.y) - i * tdWidth).toFixed(2);
        return item.x === x && item.y === y && item.color === chessPoint.color;
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  if (right && up) {
    console.log('right up');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let x = (parseFloat(chessPoint.x) + i * tdWidth).toFixed(2);
        let y = (parseFloat(chessPoint.y) - i * tdWidth).toFixed(2);
        return item.x === x && item.y === y && item.color === chessPoint.color;
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  if (left && down) {
    console.log('left down');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let x = (parseFloat(chessPoint.x) - i * tdWidth).toFixed(2);
        let y = (parseFloat(chessPoint.y) + i * tdWidth).toFixed(2);
        return item.x === x && item.y === y && item.color === chessPoint.color;
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  if (right && down) {
    console.log('right down');
    for (let i = 1; i < 5; i++) {
      let chess = chesses.find(item => {
        let x = (parseFloat(chessPoint.x) + i * tdWidth).toFixed(2);
        let y = (parseFloat(chessPoint.y) + i * tdWidth).toFixed(2);
        return item.x === x && item.y === y && item.color === chessPoint.color;
      });
      if (chess) {
        winChessArr.push(chess);
      }
    }
    if (winChessArr.length === 5) {
      return winChessArr;
    }
  }
  return false;
}

function paintChess(chessPoint) {
  let chess = document.createElement('div');
  chess.className = 'chess ' + chessPoint.color;
  chess.setAttribute('data-x', chessPoint.x);
  chess.setAttribute('data-y', chessPoint.y);
  chess.style.left = chessPoint.x + 'px';
  chess.style.top = chessPoint.y + 'px';
  chess.style.width = tdWidth * 0.9 + 'px';
  chess.style.height = tdWidth * 0.9 + 'px';
  doms.chessBoard.appendChild(chess);
}

function checkMove(chessPoint) {
  // 棋子是否存在
  let chess = chesses.find(item => {
    return item.x === chessPoint.x && item.y === chessPoint.y;
  });
  if (chess) {
    alert('chess already exists');
    return;
  } else {
    color = color === 'white' ? 'black' : 'white';
    chessPoint.color = color;
    chesses.push(chessPoint);
    paintChess(chessPoint);
    let isHasWinner = checkWinner(chessPoint);
    if (isHasWinner && isHasWinner.length === 5) {
      end(isHasWinner);
    }
  }
}

function handleMove(e) {
  if (isGameOver) {
    alert('Restart a new game?');
    isGameOver = false;
    chesses.length = 0;
    color = 'black';
    doms.chessBoard.removeEventListener('click', handleMove);
    initChessBoard();
    return;
  }
  if (e.target.nodeName === 'TD') {
    let row = parseInt(e.target.dataset.row);
    let col = parseInt(e.target.dataset.col);
    let chessPoint;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    // 取格子左上方顶点
    if (mouseX < tdWidth / 2 && mouseY < tdWidth / 2) {
      let leftTop = {
        x: col * tdWidth,
        y: row * tdWidth,
      };
      chessPoint = leftTop;
    }
    // 取格子右上方顶点
    if (mouseX > tdWidth / 2 && mouseY < tdWidth / 2) {
      let rightTop = {
        x: (col + 1) * tdWidth,
        y: row * tdWidth,
      };
      chessPoint = rightTop;
    }
    // 取格子右下方顶点
    if (mouseX > tdWidth / 2 && mouseY > tdWidth / 2) {
      let rightBottom = {
        x: (col + 1) * tdWidth,
        y: (row + 1) * tdWidth,
      };
      chessPoint = rightBottom;
    }
    // 取格子左下方顶点
    if (mouseX < tdWidth / 2 && mouseY > tdWidth / 2) {
      let leftBottom = {
        x: col * tdWidth,
        y: (row + 1) * tdWidth,
      };
      chessPoint = leftBottom;
    }
    chessPoint.x = chessPoint.x.toFixed(2);
    chessPoint.y = chessPoint.y.toFixed(2);
    checkMove(chessPoint);
  }
}

function initChessBoard() {
  let rows = '';
  // 生成棋盘格子
  for (let i = 0; i < 14; i++) {
    let tr = '<tr>';
    for (let j = 0; j < 14; j++) {
      const td = `<td data-row=${i} data-col=${j}></td>`;
      tr += td;
    }
    tr += '</tr>';
    rows += tr;
  }
  doms.chessBoard.innerHTML = rows;
  tdWidth = (doms.chessBoard.clientWidth / 14).toFixed(2);
  doms.chessBoard.addEventListener('click', handleMove);
}

function main() {
  initChessBoard();
}

main();
