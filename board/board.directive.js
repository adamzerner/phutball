angular
  .module('phutball')
  .directive('phutballBoard', board)
;

function board() {
  return {
    restrict: 'E',
    templateUrl: '/board/board.directive.html'
  };
}
