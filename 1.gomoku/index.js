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

function checkWinner() {
  for (let i = 0; i < chesses.length; i++) {
    let chess = chesses[i];
  }
}

function paintChess(chessPoint) {
  let chess = document.createElement('div');
  chess.className = 'chess';
  chess.style.left = chessPoint.x + 'px';
  chess.style.top = chessPoint.y + 'px';
  chess.style.width = tdWidth * 0.9 + 'px';
  chess.style.height = tdWidth * 0.9 + 'px';
  chess.style.backgroundColor = chessPoint.color;
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
  doms.chessBoard.addEventListener('click', e => {
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
      checkMove(chessPoint);
    }
  });
}

function main() {
  initChessBoard();
}

main();
