(function() {
  if (window.Game === undefined) {
    window.Game = {};
  }

  var Board = Game.Board = function(size, endCallback) {
    this.xSize = size[0];
    this.ySize = size[1];
    this.endCallback = endCallback;
  };

  Board.prototype.startGame = function(int) {
    this.snake = new Game.Snake(this.randomPos());
    this.apple = this.randomApple();
    window.gameInterval = setInterval(function() {
      view.board.move();
      view.render();
    }, int);
  };

  Board.prototype.randomApple = function () {
    var pos;
    do {
      pos = this.randomPos();
    } while (this.onSnakeBody(pos));
    return pos;
  };

  Board.prototype.randomPos = function () {
    var x = Math.floor(Math.random() * this.xSize);
    var y = Math.floor(Math.random() * this.ySize);
    return [x, y];
  };

  Board.prototype.move = function () {
    if(this.isOver()){
      this.endGame();
    } else {
      if (this.samePos(this.apple, this.snake.segments[0])) {
        this.snake.grow();
        this.apple = this.randomApple();
      } else {
        this.snake.move();
      }
    }
  };

  Board.prototype.endGame = function() {
    clearInterval(window.gameInterval);
    this.endCallback();
  };

  Board.prototype.samePos = function (pos1, pos2) {
    var x1 = pos1[0];
    var y1 = pos1[1];
    var x2 = pos2[0];
    var y2 = pos2[1];

    if (x1 === x2 && y1 === y2) {
      return true;
    }
    return false;
  };

  Board.prototype.isOver = function () {
    var snakeHead = this.snake.segments[0];
    if(this.onSnakeBody(snakeHead)){
      return true;
    } else if(snakeHead[0] < 0 || snakeHead[0] >= this.xSize || snakeHead[1] < 0 || snakeHead[1] >= this.ySize){
      return true;
    }
    return false;
  };

  Board.prototype.onSnakeBody = function(coord) {
    for(var i = 1; i < this.snake.segments.length; i++){
      var x = this.snake.segments[i][0];
      var y = this.snake.segments[i][1];
      if(x === coord[0] && y === coord[1]){
        return true;
      }
    }
    return false;
  };
})();
