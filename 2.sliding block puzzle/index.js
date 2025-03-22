/**
 * 游戏配置
 */
const gameConfig = {
  isGameOver: false,
  width: 500,
  height: 500,
  row: 3,
  col: 3,
  imgUrl: './images/Legion.png',
  dom: document.getElementById('game'),
};
gameConfig.pieceNum = gameConfig.row * gameConfig.col;
gameConfig.pieceWidth = gameConfig.width / gameConfig.col;
gameConfig.pieceHeight = gameConfig.height / gameConfig.row;

const blocks = [];
function Block(row, col) {
  let left = gameConfig.pieceWidth * col;
  let top = gameConfig.pieceHeight * row;
  let isVisible = true;
  if (row === gameConfig.row - 1 && col === gameConfig.col - 1) {
    isVisible = false;
  }

  this.row = row;
  this.col = col;
  this.left = left;
  this.top = top;
  this.correctLeft = left;
  this.correctTop = top;
  this.dom = null;

  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.dataset.row = row;
  piece.dataset.col = col;
  piece.style.position = 'absolute';
  piece.style.width = gameConfig.pieceWidth + 'px';
  piece.style.height = gameConfig.pieceHeight + 'px';
  piece.style.border = '1px solid #ccc';
  piece.style.backgroundImage = `url(${gameConfig.imgUrl})`;
  piece.style.backgroundSize =
    gameConfig.width + 'px ' + gameConfig.height + 'px';
  piece.style.backgroundPosition = `-${left}px -${top}px`;
  piece.style.transition = 'all 0.3s';
  piece.style.cursor = 'pointer';
  if (!isVisible) {
    piece.style.display = 'none';
  }
  gameConfig.dom.appendChild(piece);
  this.dom = piece;

  this.show = function () {
    piece.style.left = this.left + 'px';
    piece.style.top = this.top + 'px';
  };
  // 判断拼图是否在正确位置上
  this.isCorrect = function () {
    return this.left === this.correctLeft && this.top === this.correctTop;
    // (isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop));
  };
}

function isEqual(n1, n2) {
  return parseInt(n1) === parseInt(n2);
}

function init() {
  // 初始化游戏配置
  blocks.length = 0;
  gameConfig.isGameOver = false;
  gameConfig.dom.innerHTML = '';
  // 初始化游戏容器
  initGameContainer();
  // 拼图洗牌
  shuffle();

  function initGameContainer() {
    gameConfig.dom.style.position = 'relative';
    gameConfig.dom.style.margin = '0 auto';
    gameConfig.dom.style.width = gameConfig.width + 'px';
    gameConfig.dom.style.height = gameConfig.height + 'px';
    gameConfig.dom.style.border = '2px solid #ccc';

    for (let i = 0; i < gameConfig.row; i++) {
      for (let j = 0; j < gameConfig.col; j++) {
        const piece = new Block(i, j);
        blocks.push(piece);
      }
    }
  }
  function shuffle() {
    // 忽略最后一项，产生随机数时同样不包含最后一项
    for (let i = 0; i < blocks.length - 1; i++) {
      const randomIndex = getRandomInt(0, blocks.length - 2);
      const randomBlock = blocks[randomIndex];

      exchangeBlock(blocks[i], randomBlock);
    }
    blocks.forEach(block => {
      block.show();
    });
  }
  function exchangeBlock(current, block2) {
    let temp = current.left;
    current.left = block2.left;
    block2.left = temp;
    temp = current.top;
    current.top = block2.top;
    block2.top = temp;
  }
  function getRandomInt(min, max) {
    max++; // 使结果可以包含最大值
    return Math.floor(Math.random() * (max - min) + min);
  }

  gameConfig.dom.addEventListener('click', handleClick);

  function handleClick(e) {
    if (gameConfig.isGameOver) {
      alert('恭喜你，拼图成功！是否重新开始？');
      gameConfig.dom.removeEventListener('click', handleClick);
      init();
      return;
    }
    if (e.target.tagName !== 'DIV' || !e.target.classList.contains('piece')) {
      return;
    }
    const lastPiece = blocks[blocks.length - 1];

    // 通过 dataset 获取 row 和 col，进一步获取当前点击的拼图实例
    const { row, col } = e.target.dataset;
    const currentPiece = blocks.find(
      block => block.row == row && block.col == col
    );

    // 判断点击的拼图是否与最后一个拼图相邻
    const left = currentPiece.left;
    const top = currentPiece.top;

    // 由于数据计算的精度问题，使用容错判断来判断是否相邻
    function isNear(a, b, tolerance = 0.1) {
      return Math.abs(a - b) <= tolerance;
    }
    if (
      (isNear(Math.abs(lastPiece.left - left), gameConfig.pieceWidth) &&
        isNear(lastPiece.top, top)) ||
      (isNear(Math.abs(lastPiece.top - top), gameConfig.pieceHeight) &&
        isNear(lastPiece.left, left))
    ) {
      // 交换位置
      exchangeBlock(currentPiece, lastPiece);
      // 显示拼图
      blocks.forEach(block => {
        block.show();
      });
      checIskWin();
    }
  }

  // 检查是否拼图成功
  function checIskWin() {
    const wrongPieces = blocks.filter(block => {
      return !block.isCorrect();
    });
    if (wrongPieces.length === 0) {
      gameConfig.isGameOver = true;
      blocks.forEach(block => {
        setTimeout(() => {
          block.dom.style.display = 'block';
          block.dom.style.border = 'none';
        }, 500);
      });
    }
    return wrongPieces.length === 0 ? true : false;
  }
}

init();
