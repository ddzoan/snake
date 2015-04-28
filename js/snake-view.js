(function() {
  if (Game === undefined) {
    window.Game = {};
  }

  var View = Game.View = function($board, $menu) {
    this.size = [30, 30];
    this.$grid = $board;
    this.$menu = $menu;
  };

  View.prototype.showMenu = function() {
    this.$menu.append("<div>Instructions</div>");
    this.$menu.append('<div class="start">click to start</div>');
    this.$menu.find('.start').one("click", function(){
      this.startGame();
    }.bind(this));
  };

  View.prototype.removeMenu = function() {
    this.$menu.html('');
  };

  View.prototype.startGame = function() {
    this.removeMenu();
    this.board = new Game.Board(this.size, this.endGame.bind(this));
    this.setupBoard(this.size);
    this.eventListener();
    var int = 100;
    this.board.startGame(int);
  };

  View.prototype.endGame = function() {
    console.log("game over");
    this.showMenu();
  };

  View.prototype.setupBoard = function (size) {
    this.$grid.html('');
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
