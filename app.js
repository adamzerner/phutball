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
      inProgressJump.apply(this, arguments);
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
      jumpInProgress = [ballPosition];
    }
    else {
      console.error('Click an empty space or the ball to move.');
    }
  };

  function inProgressJump(cell, row, column) {
    if (cell === 'ball') {
      console.error("You need to jump to a new space.");
      return;
    }

    if (cell === 'player') {
      if (validStep(row, column)) {
        jumpInProgress.push([row, column]);
        vm.board[row][column] = 'in progress';
      }
      return;
    }

    if (!validStep(row, column)) {
      console.error('Invalid attempt.');
      return;
    }

    // remove jumped pieces
    jumpInProgress.forEach(function(piece, index) {
      var row = piece[0];
      var column = piece[1];

      vm.board[row][column] = undefined;
    });
    jumpInProgress = false;

    // move the ball
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

  function validStep(nextRow, nextColumn) {
    var previousPoint = jumpInProgress[jumpInProgress.length - 1];
    var previousRow = previousPoint[0];
    var previousColumn = previousPoint[1];

    if (nextRow === previousRow && nextColumn === previousColumn) {
      return false;
    }
    if (Math.abs(nextRow - previousRow) <= 1 && Math.abs(nextColumn - previousColumn) <= 1) {
      return true
    }
    return false;
  }

  function initializeBoard() {
    vm.board = new Array(19);

    for (var i = 0; i < 19; i++) {
      vm.board[i] = new Array(15);
    }

    vm.board[9][7] = 'ball';
  }
}
