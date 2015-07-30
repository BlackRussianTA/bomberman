function game() {
    var module = (function () {
            var player,
                stone,
                path,
                enemy,
                gate,
                bomb,
                game,
                fire,
                coin,
                CONSTANTS = {
                    DIV_ID: 'kinetic-canvas',
                    BOX_WIDTH: 64,
                    BOX_HEIGHT: 64,
                    GATE_IMG_SRC: 'images/gate.png',
                    PLAYER_IMG_SRC: 'images/player_walk2.png',
                    ENEMY_IMG_SRC: 'images/mouse.png',
                    COIN_IMG_SRC: 'images/coin.png',
                    PATH_IMG_SRC: 'images/grass.png',
                    STONE_IMG_SRC: 'images/stone.png',
                    BOMB_IMG_SRC: 'images/bomb.png',
                    FIRE_IMG_SRC: 'images/fire.png'
                };

            var helpers = {
                getIndexOf: function (elems, row, column) {
                    var index = -1;
                    elems.forEach(function (elem, i) {
                        if (elem.row === row && elem.column === column) {
                            index = i;
                            return true;
                        }
                    });
                    return index;
                },
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
                                case '+':
                                    var newStone = Object.create(stone).init([c, r]);
                                    setTimeout(function () {
                                        g.stone_layer.add(newStone.object);
                                    }, 60);
                                    g.stones.push(newStone);
                                    break;
                                case 'c':
                                    var newCoin = Object.create(coin).init([c, r]);
                                    g.coin_layer.add(newCoin.object);
                                    g.coins.push(newCoin);
                                    break;
                                case 'p':
                                    var newPlayer = Object.create(player).init([c, r]);
                                    g.player_layer.add(newPlayer.object);
                                    g.player = newPlayer;
                                    break;
                                case 'e':
                                    var newEnemy = Object.create(enemy).init([c, r]);
                                    g.enemies_layer.add(newEnemy.object);
                                    g.enemies.push(newEnemy);
                                    break;
                                case 'g':
                                    var newGate = Object.create(gate).init([c, r]);
                                    g.gate_layer.add(newGate.object);
                                    g.gate = newGate;
                                    break;
                                case 'b':
                                    var newBomb = Object.create(bomb).init([c, r]);
                                    g.bomb_layer.add(newBomb.object);
                                    g.bomb = newBomb;
                                    break;
                            }
                        });
                    });
                },
                getNextGridElem: function (direction, position, grid) {
                    var type = -1;
                    switch (direction) {
                        case 'right':
                            if (grid[position[0]] && grid[position[0]][position[1] + 1]) {
                                type = grid[position[0]][position[1] + 1];
                            }
                            break;
                        case 'left':
                            if (grid[position[0]] && grid[position[0]][position[1] - 1]) {
                                type = grid[position[0]][position[1] - 1];
                            }
                            break;
                        case 'down':
                            if (grid[position[0] + 1] && grid[position[0] + 1][position[1]]) {
                                type = grid[position[0] + 1][position[1]];
                            }
                            break;
                        case 'up':
                            if (grid[position[0] - 1] && grid[position[0] - 1][position[1]]) {
                                type = grid[position[0] - 1][position[1]];
                            }
                            break;
                    }
                    return type;
                },
                isPossiblePlayerMove: function (direction, player, grid, gate_status) {
                    var nextGridElem = this.getNextGridElem(direction, [player.row, player.column], grid);

                    if (nextGridElem == 'g' && gate_status === false) {
                        return true;
                    }
                    ;
                    if (nextGridElem !== -1 && nextGridElem !== '+') {
                        return true;
                    }
                    return false;
                },
                movePlayer: function (direction, player, grid) {
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
                        var move = helpers.getRandomInt(0, 3);
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
                        var move = helpers.getRandomInt(0, 3);
                        while (oldDirection == moves[move] && helpers.isPossiblePlayerMove(moves[move], this, grid, true) == false) {
                            move = helpers.getRandomInt(0, 3);
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
            coin = (function () {
                var currentId = 0,
                    coin = Object.create({});
                Object.defineProperty(coin, 'init', {
                    value: function (position) {
                        this.object = helpers.createImageObject(position, CONSTANTS.COIN_IMG_SRC);
                        this.id = ++currentId;
                        this.row = position[1];
                        this.column = position[0];
                        return this;
                    }
                });
                return coin;
            }());
            bomb = (function () {
                var currentId = 0,
                    bomb = Object.create({});
                Object.defineProperty(bomb, 'init', {
                    value: function (position) {
                        this.object = helpers.createImageObject(position, CONSTANTS.BOMB_IMG_SRC);
                        this.id = ++currentId;
                        this.row = position[1];
                        this.column = position[0];
                        return this;
                    }
                });
                return bomb;
            }());
            fire = (function () {
                var currentId = 0,
                    fire = Object.create({});
                Object.defineProperty(fire, 'init', {
                    value: function (position) {
                        this.object = helpers.createImageObject(position, CONSTANTS.FIRE_IMG_SRC);
                        this.id = ++currentId;
                        this.row = position[1];
                        this.column = position[0];
                        return this;
                    }
                });
                return fire;
            }());
            game = (function () {
                game = Object.create({});


                Object.defineProperty(game, 'init', {
                    value: function (grid) {
                        this.grid = grid;
                        this.startTime = Math.floor(Date.now() / 1000);
                        this.endTime = -1;
                        this.timeCompleted = 0;
                        this.lives = 3;
                        this.points = 0;
                        this.stage = helpers.createStage(grid);
                        this.player_layer = new Kinetic.Layer();
                        this.enemies_layer = new Kinetic.Layer();
                        this.path_layer = new Kinetic.Layer();
                        this.stone_layer = new Kinetic.Layer();
                        this.gate_layer = new Kinetic.Layer();
                        this.bomb_layer = new Kinetic.Layer();
                        this.coin_layer = new Kinetic.Layer();
                        this.fire_layer = new Kinetic.Layer();
                        this.coins = [];
                        this.path;
                        this.stones = [];
                        this.enemies = [];
                        this.bombs = [];
                        this.fires = [];
                        var that = this;

                        //add grass(path) background
                        var imageObj = new Image();
                        imageObj.src = CONSTANTS.PATH_IMG_SRC;
                        path = new Kinetic.Image({
                            x: 0,
                            y: 0,
                            fillPatternImage: imageObj,
                            width: CONSTANTS.BOX_WIDTH * this.grid[0].length,
                            height: CONSTANTS.BOX_HEIGHT * this.grid.length,
                            fillPatternRepeat: "repeat"
                        });
                        this.path_layer.add(path);
                        helpers.buildGrid(this, grid);
                        // wait the images to be loaded
                        // and then add the layers to the stage
                        setTimeout(function () {
                            that.stage.add(that.path_layer);
                        }, 60);
                        setTimeout(function () {
                            that.stage.add(that.fire_layer);
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
                        setTimeout(function () {
                            that.stage.add(that.bomb_layer);
                        }, 60);
                        setTimeout(function () {
                            that.stage.add(that.coin_layer);
                        }, 60);

                        setTimeout(function () {
                            that.stage.add(that.gate_layer);
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
                            var that = this;
                            // update the grid matrix values
                            switch (that.grid[cur[0]][cur[1]]) {
                                case 'e':
                                    that.remove_life();
                                    that.bomb_layer.draw();
                                    break;
                                case 'g':
                                    that.endTime = Math.floor(Date.now() / 1000);
                                    alert('Level Completed');
                                    that.timeCompleted = that.endTime - that.startTime;
                                    that.points += that.timeCompleted / 2;
                                    console.log('complete for ' + that.timeCompleted + ' seconds ');
                                    console.log('points: ' + that.points);
                                    break;
                                case 'c':
                                    that.points += 10;
                                    var index = helpers.getIndexOf(that.coins, cur[0], cur[1]);
                                    var coin = that.coins[index];
                                    coin.object.remove();
                                    that.coin_layer.draw();
                                    that.coins.splice(index, 1);
                                default:
                                    that.grid[cur[0]][cur[1]] = 'p';
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
                        this.enemies.forEach(function (enemy) {
                            var prev = [enemy.row, enemy.column];
                            var canMove = helpers.isPossiblePlayerMove(enemy.direction, enemy, that.grid, that.gate.locked);
                            if (canMove) {
                                var cur = helpers.movePlayer(enemy.direction, enemy, that.grid);
                                that.enemies_layer.draw();
                                if (that.grid[cur[0]][cur[1]] == 'p') {
                                    //------------------------------------------------------------------------------------------------------------------
                                    that.grid[cur[0]][cur[1]] = 'b';
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

                Object.defineProperty(game, 'remove_life', {
                    value: function () {
                        this.lives -= 1;
                        console.log('remaining lives: ' + this.lives);
                        if (this.lives < 0) {
                            this.player_layer.remove(this.player.object);
                            console.log('game over');
                            this.endTime = Math.floor(Date.now() / 1000);
                            this.timeCompleted = this.endTime - this.startTime;
                            this.points += this.timeCompleted / 2;

                            console.log('complete for ' + this.timeCompleted + ' seconds ');
                            console.log('points ' + this.points);
                            this.player_layer.draw();
                        } else {
                            this.player.row = 0;
                            this.player.column = 0;
                            this.player.object.setX(0);
                            this.player.object.setY(0);
                            this.player_layer.draw();
                            this.grid[0][0] = 'p';
                            console.log(this.grid);
                        }
                    }
                });


                Object.defineProperty(game, 'put_bomb', {
                    value: function () {
                        var that = this;
                        var positionOfBomb = [this.player.column, this.player.row];
                        var newBomb = Object.create(bomb).init(positionOfBomb);
                        this.bomb_layer.add(newBomb.object);
                        this.bombs.push(newBomb);
                        this.bomb_layer.draw();
                        //console.log(this.bomb_layer);

                        setTimeout(function () {
                            that.bombs[0].object.remove();
                            that.bombs.shift();
                            that.bomb_layer.draw();

                        }, 1000);

                        setTimeout(function () {
                            that.show_fire(positionOfBomb);
                        }, 500)


                        //this.grid[positionOfBomb[0]][positionOfBomb[1]]='b';
                        /*                    for (var i = 0; i < this.grid.length; i += 1) {
                         console.log(this.grid[i])
                         }*/

                        return this;
                    }
                });

                Object.defineProperty(game, 'perform_fire_objects', {
                    value: function (fireObjPosition) {
                        var fireObj = Object.create(fire).init(fireObjPosition);
                        //console.log(game);
                        this.fire_layer.add(fireObj.object);
                        this.fires.push(fireObj);
                    }
                });

                Object.defineProperty(game, 'show_fire', {
                    value: function (positionOfBomb) {
                        var NUMBER_OF_FIRE_OBJECTS = 4;
                        var that = this;
                        var positionsOfFireUp = [positionOfBomb[0], positionOfBomb[1] - 1];
                        var positionsOfFireDown = [positionOfBomb[0], positionOfBomb[1] + 1];
                        var positionsOfFireLeft = [positionOfBomb[0] - 1, positionOfBomb[1]];
                        var positionsOfFireRight = [positionOfBomb[0] + 1, positionOfBomb[1]];

                        this.perform_fire_objects(positionsOfFireUp);
                        this.perform_fire_objects(positionsOfFireDown);
                        this.perform_fire_objects(positionsOfFireLeft);
                        this.perform_fire_objects(positionsOfFireRight);

                        /*                        for (var i = 0; i < this.grid.length; i += 1) {
                         console.log(this.grid[i]);
                         }
                         ;*/

                        this.fire_layer.draw();

                        setTimeout(function () {
                            that.fires[0].object.remove();
                            that.fires[1].object.remove();
                            that.fires[2].object.remove();
                            that.fires[3].object.remove();
                            that.fires.shift();
                            that.fires.shift();
                            that.fires.shift();
                            that.fires.shift();

                            that.kill_creatures_in_the_range(positionsOfFireUp);
                            that.kill_creatures_in_the_range(positionsOfFireDown);
                            that.kill_creatures_in_the_range(positionsOfFireLeft);
                            that.kill_creatures_in_the_range(positionsOfFireRight);
                            that.kill_creatures_in_the_range(positionOfBomb);

                            that.enemies_layer.draw();
                            that.fire_layer.draw();
                            that.stone_layer.draw();
                        }, 1000);

                        return this;
                    }
                });

                Object.defineProperty(game, 'kill_creatures_in_the_range', {
                    value: function (killingCoordinates) {
                        for (var i = 0; i < this.enemies.length; i += 1) {
                            if (this.enemies[i].column == killingCoordinates[0]
                                && this.enemies[i].row == killingCoordinates[1]) {
                                this.enemies[i].object.remove();
                                this.enemies.splice(i, 1);
                                this.grid[killingCoordinates[1]][killingCoordinates[0]] = '=';
                                //this.path_layer.draw();
                            }
                        }

                        if(this.player.column==killingCoordinates[0] && this.player.row == killingCoordinates[1]){
                            this.remove_life();
                        }
                    }
                });

                return game;
            })();

            return {
                getGame: function (grid) {
                    return Object.create(game).init(grid);
                }
            };
        }
        ()
        )
        ;

    return module;
}

var module = game();

var gameSet = [
    ['p', '=', '+', '+', '=', '+', '+', '=', '='],
    ['+', '=', '+', 'c', '=', '+', '+', '=', '+'],
    ['+', '=', '=', '=', '=', '+', '+', '=', 'c'],
    ['=', '=', '+', '=', '=', '=', '=', '=', '+'],
    ['=', '=', '+', 'c', '=', '+', '+', '=', '+'],
    ['=', '=', '+', '+', '=', '+', 'c', '=', '+'],
    ['=', 'e', '+', '+', '=', '+', '+', 'e', 'g']
];
window.onload = function () {


    var game = module.getGame(gameSet);
    setInterval(function () {
        game.enemy_move();
    }, 1000);
    window.onkeydown = function (ev) {
        if (ev.keyCode === 38 || ev.keyCode === 87) {
            game.player_move('up');
        }
        else if (ev.keyCode === 37 || ev.keyCode === 65) {
            game.player_move('left');
        } else if (ev.keyCode === 39 || ev.keyCode === 68) {
            game.player_move('right');
        } else if (ev.keyCode === 40 || ev.keyCode === 83) {
            game.player_move('down');
        } else if (ev.keyCode === 32) {
            game.put_bomb();
        }
    };
};