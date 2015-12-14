angular
  .module('phutball', [])
  .controller('MainController', MainController)
;

function MainController() {
  var vm = this;

  initializeBoard(vm);

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
    if (!cell) {
      vm.board[row][column] = 'player';
    }
    else if (cell === 'ball') {

    }
    else {
      console.error('Click an empty space or the ball to move.');
      return;
    }
    vm.changeTurn();
  };
}

function initializeBoard(vm) {
  vm.board = new Array(19);

  for (var i = 0; i < 19; i++) {
    vm.board[i] = new Array(15);
  }

  vm.board[9][7] = 'ball';
}
