(function() {
  if (window.Game === undefined) {
    window.Game = {};
  }

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
  };


})();
