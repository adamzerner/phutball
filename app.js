angular
  .module('phutball', [])
  .controller('MainController', MainController)
;

function MainController() {
  var vm = this;
  var jumpInProgress = false;
  var ballPosition = [9, 7];

  initializeBoard();

  vm.turn = 'Eks';
  vm.changeTurn = function() {
    if (vm.turn === 'Eks') {
      vm.turn = 'Ohs';
    }
    else if (vm.turn === 'Ohs') {
      vm.turn = 'Eks';
    }
  };

  vm.makeMove = function(cell, row, column) {
    if (!jumpInProgress) {
      firstClick.apply(this, arguments);
    }
    else if (jumpInProgress) {
      jump.apply(this, arguments);
    }
  };

  vm.reset = function() {
    jumpInProgress = false;
    ballPosition = [9, 7];
    vm.turn = 'Eks';
    initializeBoard();
  };

  function firstClick(cell, row, column) {
    if (!cell) {
      vm.board[row][column] = 'player';
      vm.changeTurn();
    }
    else if (cell === 'ball') {
      jumpInProgress = true;
    }
    else {
      console.error('Click an empty space or the ball to move.');
    }
  };

  function jump(cell, row, column) {
    if (cell === 'player' || cell === 'ball') {
      console.error("Can't jump to a populated space.");
      return;
    }

    if (!validJump(row, column)) {
      console.error("Can't jump to that space.");
      return;
    }

    // remove jumped pieces

    // move the ball
    vm.board[ballPosition[0]][ballPosition[1]] = undefined;
    vm.board[row][column] = 'ball';
    ballPosition = [row, column];

    // check if they won
    if (vm.turn === 'Eks' && row === 0) {
      alert('Eks wins!');
    }
    else if (vm.turn === 'Ohs' && row === 18) {
      alert('Ohs wins!');
    }

    jumpInProgress = false;
  }

  function validJump(endRow, endColumn) {
    // I was just getting up to graph traversal in my data structures studies :(
    // This is bound to be imperfect
    return true;
  }

  function initializeBoard() {
    vm.board = new Array(19);

    for (var i = 0; i < 19; i++) {
      vm.board[i] = new Array(15);
    }

    vm.board[9][7] = 'ball';
  }
}
