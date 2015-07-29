function game() {
    var module = (function () {
        var player,
            stone,
            path,
            enemy,
            gate,
            game,
            CONSTANTS = {
                DIV_ID: 'kinetic-canvas',
                BOX_WIDTH: 64,
                BOX_HEIGHT: 64,
                GATE_IMG_SRC: 'images/gate.png',
                PLAYER_IMG_SRC: 'images/player_walk2.png',
                ENEMY_IMG_SRC: 'images/mouse.png',
                PATH_IMG_SRC: 'images/grass.png',
                STONE_IMG_SRC: 'images/stone.png'
            };

        function indexOfElementWithIdInCollection(collection, id) {
            var i, len;
            for (i = 0, len = collection.length; i < len; i++) {
                if (collection[i].id == id) {
                    return i;
                }
            }

            return -1;
        }

        helpers = {
            getRandomInt: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            createImageObject: function (position, imageSrc) {
                var x = CONSTANTS.BOX_WIDTH * position[0];
                var y = CONSTANTS.BOX_HEIGHT * position[1];
                var imageObj = new Image();
                imageObj.src = imageSrc;
                var obj = new Kinetic.Image({
                    x: x,
                    y: y,
                    image: imageObj,
                    width: CONSTANTS.BOX_WIDTH,
                    height: CONSTANTS.BOX_HEIGHT
                });
                return obj;
            },
            createStage: function (grid) {
                var height = grid.length * CONSTANTS.BOX_HEIGHT;
                var width = grid[0].length * CONSTANTS.BOX_WIDTH;
                var stage = new Kinetic.Stage({
                    container: CONSTANTS.DIV_ID,
                    width: width,
                    height: height
                });
                return stage;
            },
            buildGrid: function (g, grid) {
                grid.forEach(function (row, r) {
                    row.forEach(function (val, c) {
                        switch (val) {
                            case '=':
                                var newPath = Object.create(path).init([c, r]);
                                setTimeout(function () {
                                    g.path_layer.add(newPath.object);;
                                }, 60);
                                g.paths.push(newPath);
                                break;
                            case '+':
                                var newStone = Object.create(stone).init([c, r]);
                                setTimeout(function () {
                                    g.stone_layer.add(newStone.object);
                                }, 60);
                                g.stones.push(newStone);
                                break;
                            case 'p':
                                var newPath = Object.create(path).init([c, r]);
                                g.path_layer.add(newPath.object);
                                g.paths.push(newPath);
                                var newPlayer = Object.create(player).init([c, r]);
                                g.player_layer.add(newPlayer.object);
                                g.player = newPlayer;
                                break;
                            case 'e':
                                var newPath = Object.create(path).init([c, r]);
                                g.path_layer.add(newPath.object);
                                g.paths.push(newPath);
                                var newEnemy = Object.create(enemy).init([c, r]);
                                g.enemies_layer.add(newEnemy.object);
                                g.enemies.push(newEnemy);
                                break;
                            case 'g':
                                var newGate = Object.create(gate).init([c, r]);
                                g.gate_layer.add(newGate.object);
                                g.gate = newGate;
                                break
                        }
                    });
                });
            },
            getNextGridElem: function (direction, position, grid) {
                var type = -1;
                switch (direction) {
                    case 'right':
                        if (grid[position[0]] &&grid[position[0]][position[1] + 1]) {
                            type = grid[position[0]][position[1] + 1];
                        }
                        break;
                    case 'left':
                        if (grid[position[0]] &&grid[position[0]][position[1] - 1]) {
                            type = grid[position[0]][position[1] - 1];
                        }
                        break;
                    case 'down':
                        if (grid[position[0] + 1] && grid[position[0] + 1][position[1]]) {
                            type = grid[position[0] + 1][position[1]];
                        }
                        break;
                    case 'up':
                        if (grid[position[0] - 1] &&  grid[position[0] - 1][position[1]]) {
                            type = grid[position[0] - 1][position[1]];
                        }
                        break;
                }
                return type;
            },
            isPossiblePlayerMove: function (direction, player, grid, gate_status) {
                var nextGridElem = this.getNextGridElem(direction, [player.row, player.column], grid);
                if(nextGridElem == 'g' && gate_status === false){
                    return true;
                };
                if (nextGridElem !== -1 && nextGridElem != '+' ) {
                    return true;
                }
                return false;
            },
            movePlayer: function(direction, player, grid){
                var cur;
                switch (direction) {
                    case 'right':
                        cur = [player.row, player.column + 1];
                        //move player
                        var newX = player.object.getX() + CONSTANTS.BOX_WIDTH;
                        player.object.setX(newX);
                        //update player's column
                        player.column += 1;
                        break;
                    case 'left':
                        cur = [player.row, player.column - 1];
                        var newX = player.object.getX() - CONSTANTS.BOX_WIDTH;
                        player.object.setX(newX);
                        player.column -= 1;
                        break;
                    case 'down':
                        cur = [player.row + 1, player.column];
                        var newY = player.object.getY() + CONSTANTS.BOX_HEIGHT;
                        player.object.setY(newY);
                        player.row += 1;
                        break;
                    case 'up':
                        cur = [player.row - 1, player.column];
                        var newY = player.object.getY() - CONSTANTS.BOX_HEIGHT;
                        player.object.setY(newY);
                        player.row -= 1;
                        break;
                }
                return cur;
            }
        };
        player = (function () {
            player = Object.create({});

            Object.defineProperty(player, 'init', {
                value: function (position) {
                    this.object = helpers.createImageObject(position, CONSTANTS.PLAYER_IMG_SRC);
                    this.row = position[1];
                    this.column = position[0];
                    return this;
                }
            });
            return player;
        }());
        enemy = (function () {
            enemy = Object.create({});

            Object.defineProperty(enemy, 'init', {
                value: function (position) {
                    this.object = helpers.createImageObject(position, CONSTANTS.ENEMY_IMG_SRC);
                    this.row = position[1];
                    this.column = position[0];
                    var moves = ['left', 'right', 'up', 'down'];
                    var move = helpers.getRandomInt(0,3);
                    this.direction = moves[move];
                    return this;
                }
            });
            // change enemy's movement direction when an obstacle is is reach
            // try to change the direction that can be taken
            Object.defineProperty(enemy, 'change_direction', {
                value: function (grid) {
                    var oldDirection = this.direction;
                    var moves = ['left', 'right', 'up', 'down'];
                    var move = helpers.getRandomInt(0,3);
                    while(oldDirection == moves[move] && helpers.isPossiblePlayerMove(moves[move], this, grid, true) == false){
                         move = helpers.getRandomInt(0,3);
                    }
                    this.direction = moves[move];
                }
            });
            return enemy;
        }());
        gate = (function () {
                gate = Object.create({});
            Object.defineProperty(gate, 'init', {
                value: function (position) {
                    this.object = helpers.createImageObject(position, CONSTANTS.GATE_IMG_SRC);
                    this.row = position[1];
                    this.column = position[0];
                    this.locked = false;
                    return this;
                }
            });
            return gate;
        }());
        path = (function () {
            var currentId = 0,
                path = Object.create({});
            Object.defineProperty(path, 'init', {
                value: function (position) {
                    this.object = helpers.createImageObject(position, CONSTANTS.PATH_IMG_SRC);
                    this.id = ++currentId;
                    this.row = position[1];
                    this.column = position[0];
                    return this;
                }
            });
            return path;
        }());
        stone = (function () {
            var currentId = 0,
                stone = Object.create({});
            Object.defineProperty(stone, 'init', {
                value: function (position) {
                    this.object = helpers.createImageObject(position, CONSTANTS.STONE_IMG_SRC);
                    this.id = ++currentId;
                    this.row = position[1];
                    this.column = position[0];
                    return this;
                }
            });
            return stone;
        }());
        game = (function () {
                game = Object.create({});
            Object.defineProperty(game, 'init', {
                value: function (grid) {
                    this.grid = grid;
                    this.stage = helpers.createStage(grid);
                    this.player_layer = new Kinetic.Layer();
                    this.enemies_layer = new Kinetic.Layer();
                    this.path_layer = new Kinetic.Layer();
                    this.stone_layer = new Kinetic.Layer();
                    this.gate_layer = new Kinetic.Layer();
                    this.paths = [];
                    this.stones = [];
                    this.enemies = [];
                    var that = this;
                    helpers.buildGrid(this, grid);
                    // wait the images to be loaded
                    // and then add the layers to the stage
                    that.stage.add(that.gate_layer);
                    setTimeout(function () {
                        that.stage.add(that.path_layer);
                    }, 60);

                    setTimeout(function () {
                        that.stage.add(that.stone_layer);
                    }, 60);

                    setTimeout(function () {

                        that.stage.add(that.player_layer);
                    }, 60);
                    setTimeout(function () {

                        that.stage.add(that.enemies_layer);
                    }, 60);

                    return this;
                }
            });
            Object.defineProperty(game, 'player_move', {

                value: function (direction) {
                    var canMove = helpers.isPossiblePlayerMove(direction, this.player, this.grid, this.gate.locked);
                    if (canMove) {

                        //previous row and column position of the player
                        var prev = [this.player.row, this.player.column];
                        // new row and column position of the player
                        var cur = helpers.movePlayer(direction, this.player, this.grid);
                        this.player_layer.draw();
                        // update the grid matrix values
                        if (this.grid[cur[0]][cur[1]] == 'e') {
                            alert('Game Over');
                        } else if(this.grid[cur[0]][cur[1]] == 'g'){
                            alert('Level Completed');
                        } else {
                            this.grid[cur[0]][cur[1]] = 'p';
                        }
                        if (this.grid[prev[0]][prev[1]] == 'p') {
                            this.grid[prev[0]][prev[1]] = '=';
                        }
                    }
                }
            });
            Object.defineProperty(game, 'enemy_move', {

                value: function () {
                    var that = this;
                    this.enemies.forEach(function(enemy){
                        var prev = [enemy.row, enemy.column];
                        var canMove = helpers.isPossiblePlayerMove(enemy.direction, enemy, that.grid,that.gate.locked);
                        if(canMove){
                          var cur =  helpers.movePlayer(enemy.direction, enemy, that.grid);
                            that.enemies_layer.draw();
                            if (that.grid[cur[0]][cur[1]] == 'p') {
                                alert('Game Over');
                            } else {
                                that.grid[cur[0]][cur[1]] = 'e';
                            }
                            if (that.grid[prev[0]][prev[1]] == 'e') {
                                that.grid[prev[0]][prev[1]] = '=';
                            }
                        } else {
                            enemy.change_direction(that.grid);
                        }
                    });
                }
            });
            return game;
        }());


        return {
            getGame: function (grid) {
                return Object.create(game).init(grid);
            }
        };
    }());

    return module;
}

var module = game();

var gameSet = [
    ['p', '=', '+', '+', '=', '+', '+', '=', '='],
    ['+', '=', '+', '+', '=', '+', '+', '=', '+'],
    ['+', '=', '=', '=', '=', '+', '+', '=', '='],
    ['=', '=', '+', '=', '=', '=', '=', '=', '+'],
    ['=', '=', '+', '+', '=', '+', '+', '=', '+'],
    ['=', '=', '+', '+', '=', '+', '+', '=', '+'],
    ['=', 'e', '+', '+', '=', '+', '+', 'e', 'g']
];
window.onload = function () {
    var game = module.getGame(gameSet);
    setInterval(function(){
        game.enemy_move();
    },1000);
    window.onkeydown = function (ev) {
        if (ev.keyCode === 38 || ev.keyCode === 87) {
            game.player_move('up');
        }
        else if (ev.keyCode === 37 || ev.keyCode === 65) {
            game.player_move('left');
        } else if (ev.keyCode === 39 || ev.keyCode === 68) {
            game.player_move('right');
        } else if (ev.keyCode === 40  || ev.keyCode === 83) {
            game.player_move('down');
        }
    };
};