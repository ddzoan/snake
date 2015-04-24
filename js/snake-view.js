(function() {
  if (Game === undefined) {
    window.Game = {};
  }

  var View = Game.View = function($el) {
    var size = [30, 30];
    this.board = new Game.Board(size);
    this.$grid = $el;
    this.setupBoard(size);
    this.eventListener();
  }

  View.prototype.setupBoard = function (size) {
    var x = size[0];
    var y = size[1];

    for(var i = 0; i < y; i++){
      for(var j = 0; j < x; j++){
        this.$grid.append($("<div class='square' data-x='" + j + "' data-y='" + i + "'></div>"));
      }
    }
  };

  View.prototype.render = function() {
    $('#board .snake').removeClass('snake');
    $('#board .apple').removeClass('apple');
    var snake = this.board.snake;

    for(var i = 0; i < snake.segments.length; i++){
      var x = snake.segments[i][0];
      var y = snake.segments[i][1];
      $('.square[data-x=' + x + '][data-y=' + y + ']').addClass("snake");
    }

    $('.square[data-x=' + this.board.apple[0] + '][data-y=' + this.board.apple[1] + ']').addClass("apple");

  };

  View.prototype.eventListener = function() {
    var view = this;
    $(document).on('keydown', function(event) {
      view.handleKeyEvent(event);
    });
  };

  View.prototype.handleKeyEvent = function(event) {
    var keyCode = event.keyCode;
    switch(keyCode) {
      case 38:
        this.board.snake.turn('N');
        break;
      case 40:
        this.board.snake.turn('S');
        break;
      case 37:
        this.board.snake.turn('W');
        break;
      case 39:
        this.board.snake.turn('E');
        break;
    }
  };
})();
