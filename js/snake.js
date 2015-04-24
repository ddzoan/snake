(function() {
  if (window.Game === undefined) {
    window.Game = {};
  }

  var Board = Game.Board = function(size) {
    this.xSize = size[0];
    this.ySize = size[1];
    this.snake = new Snake(this.randomPos());
    this.apple = this.randomApple();
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
      console.log("end game");
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
  }

  Board.prototype.samePos = function (pos1, pos2) {
    var x1 = pos1[0];
    var y1 = pos1[1];
    var x2 = pos2[0];
    var y2 = pos2[1];

    if (x1 === x2 && y1 === y2) {
      return true;
    }
    return false;
  }

  Board.prototype.isOver = function () {
    var snakeHead = this.snake.segments[0];
    if(this.onSnakeBody(snakeHead)){
      return true;
    } else if(snakeHead[0] < 0 || snakeHead[0] > this.xSize || snakeHead[1] < 0 || snakeHead[1] > this.ySize){
      return true;
    }
    return false;
  };

  //
  // Board.prototype.render = function() {
  //   var board = "";
  //   for(var i = 0; i < this.ySize; i++){
  //     for(var j = 0; j < this.xSize; j++){
  //       if(this.onSnake([j, i])){
  //         board += 'S';
  //       } else {
  //         board += '.';
  //       }
  //     }
  //     board += "<br>";
  //   }
  //   return board;
  // };

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

  var Snake = Game.Snake = function(startingPos) {
    this.dir = "S";
    this.segments = [startingPos];
  };

  Snake.prototype.move = function() {
    var next = this.nextPos();
    this.segments.unshift(next);
    this.segments.pop();
  };

  Snake.prototype.grow = function() {
    var next = this.nextPos();
    this.segments.unshift(next);
  };

  Snake.prototype.nextPos = function() {
    var currentPos = this.segments[0];
    var dirs = {'N': [0, -1], 'S': [0, 1], 'W': [-1, 0], 'E': [1, 0]};
    var step = dirs[this.dir];
    var nextPos = [currentPos[0] + step[0], currentPos[1] + step[1]];
    return nextPos;
  };

  Snake.prototype.turn = function(newDir) {
    if(this.validTurn(newDir)){
      this.dir = newDir;
    }
  };

  Snake.prototype.validTurn = function(newDir) {
    // var opposites = {'N': 'S', 'S': 'N', 'W': 'E', 'E': 'W'};
    // if (newDir === opposites[this.dir]) {
    //   return false;
    // }
    // return true;
    if(this.segments.length === 1) {
      return true;
    }
    var currentPos = this.segments[0];
    var dirs = {'N': [0, -1], 'S': [0, 1], 'W': [-1, 0], 'E': [1, 0]};
    var step = dirs[newDir];
    var nextPos = [currentPos[0] + step[0], currentPos[1] + step[1]];
    if(this.samePos(nextPos, this.segments[1])){
      return false;
    }
    return true;
  };

  Snake.prototype.samePos = function (pos1, pos2) {
    var x1 = pos1[0];
    var y1 = pos1[1];
    var x2 = pos2[0];
    var y2 = pos2[1];

    if (x1 === x2 && y1 === y2) {
      return true;
    }
    return false;
  }


})();
