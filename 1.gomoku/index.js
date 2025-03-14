function $(select) {
  return document.querySelector(select);
}
function $$(selectAll) {
  return document.querySelectorAll(selectAll);
}

const doms = {
  chessBoard: $('.chess-board'),
};

function initChessBoard() {
  let rows = '';
  // 生成棋盘格子
  for (let i = 0; i < 14; i++) {
    let tr = '<tr>';
    for (let j = 0; j < 14; j++) {
      const td = `<td class="chess-row" data-row="${i}" data-col="${j}"></td>`;
      tr += td;
    }
    tr += '</tr>';
    rows += tr;
  }
  console.log(rows);
  doms.chessBoard.innerHTML = rows;
}

function main() {
  initChessBoard();
}

main();
