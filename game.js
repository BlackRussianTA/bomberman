// ------------------------------------------- GAME ----------------------------------------------
window.onload = function () {
    var CONSTANTS = {
            BACKGROUND_IMAGE_PATH: 'images/Backgrounds/background.png',
            SPRITE_IMAGE_PATH: 'images/Players/sprite-sheet.png',
            CANVAS_ID: 'kinetic-canvas',
            CELL_DIMENSIONS: 72,
            FIELD_ROLLS: 7,
            FIELD_COLS: 9,
            SPRITES_FRAME_RATE: 6,
            SCALE: 0.5
        },
        sprites = {
            player: animationPlayer,
            enemySun: animationEnemyOne,
            enemyHedgehog: animationEnemyTwo,
            stone: {stone: animationBox.stone},
            brick: {brick: animationBox.brick},
            gate: animationGate,
            ice: animationIce,
            empty: animationEmpty,
            background: animationBackground,
            fire: animationFire,
            coin: animationCoin,
            bomb: animationBomb
        },
        spriteImage = new Image(),
        backgroundImage = new Image(),
        animationStates = {
            idle: 'idle',
            left: 'left',
            right: 'right',
            jump: 'jump',
            move: 'move',
            stone: 'stone',
            brick: 'brick',
            locked: 'locked',
            opened: 'open',
            trap: 'trap',

        },
        gameObjectType = {
            player: 'p',
            stone: '+',
            brick: '.',
            enemy: 'e',
            empty: '=',
            path: '=',
            coin: 'c',
            gate: 'g',
            bomb: 'b',
            fire: 'f'
        },
        DIRECTIONS = {
            left: 'left',
            right: 'right',
            up: 'up',
            down: 'down'
        },
        getDirection = {
            left: {
                row: 0,
                col: -1
            },
            right: {
                row: 0,
                col: 1
            },
            up: {
                row: -1,
                col: -1
            },
            down: {
                row: 0,
                col: -1
            }
        };

    spriteImage.src = CONSTANTS.SPRITE_IMAGE_PATH;
    backgroundImage.src = CONSTANTS.BACKGROUND_IMAGE_PATH;

    setTimeout(initGame, 1000);

    var helpers = (function () {

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getNextGridElem(direction, position, grid) {
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
        }

        function isPossiblePlayerMove(direction, player, grid, gate_status) {
            var nextGridElem = getNextGridElem(direction, [player.row, player.column], grid);
            if (nextGridElem == 'g' && gate_status === false) {
                return true;
            }
            if (nextGridElem !== -1 && nextGridElem != '+') {
                return true;
            }

            return false;
        }

        function getIndexOf(elems, row, column) {
            var index = -1;
            elems.forEach(function (elem, i) {
                if (elem.row === row && elem.column === column) {
                    index = i;
                    return true;
                }
            });
            return index;
        }

        return {
            getRandomInt: getRandomInt,
            getNextGridElem: getNextGridElem,
            isPossiblePlayerMove: isPossiblePlayerMove,
            getIndexOf: getIndexOf
        }
    }());


// --------------- GAME ASSETS MODULE --------------------
    var gameAssetsBuilder = (function () {

// ----- ID -------------------------------------
        var nextID = 0;

        function getRandomDirection() {
            var moves = [DIRECTIONS.left, DIRECTIONS.right, DIRECTIONS.up, DIRECTIONS.down];
            var move = helpers.getRandomInt(0, 3);

            return moves[move];
        }

        function getRandomEnemyAnimation() {
            var states = ['enemySun', 'enemyHedgehog'];
            var state = helpers.getRandomInt(0, 1);

            return sprites[states[state]];
        }

// ----- gameObject -------------------------------------
        var gameObject = (function () {
            var gameObject = Object.create({});

            Object.defineProperty(gameObject, 'init', {
                value: function (initialRow, initialCol, startAnimation, animations, gameObjectType) {
                    var self = this;

                    self.row = initialRow;
                    self.column = initialCol;
                    self.type = gameObjectType;
                    self.id = ++nextID;

                    self.sprite = new Kinetic.Sprite({
                        x: self.column * CONSTANTS.CELL_DIMENSIONS,
                        y: self.row * CONSTANTS.CELL_DIMENSIONS,
                        image: spriteImage,
                        animations: animations,
                        animation: startAnimation,
                        frameRate: CONSTANTS.SPRITES_FRAME_RATE,
                        frame: 0
                    });

                    self.sprite.scale({x: CONSTANTS.SCALE, y: CONSTANTS.SCALE});

                    return self;
                }
            });

            Object.defineProperty(gameObject, 'start', {
                value: function () {
                    this.sprite.start();

                    return this;
                }
            });

            Object.defineProperty(gameObject, 'move', {
                value: function () {
                    this.sprite.y(this.row * CONSTANTS.CELL_DIMENSIONS);
                    this.sprite.x(this.column * CONSTANTS.CELL_DIMENSIONS);

                    return this;
                }
            });

            Object.defineProperty(gameObject, 'sprite', {
                get: function () {
                    return this._sprite;
                },
                set: function (value) {
                    // TODO: check type
                    this._sprite = value;
                }
            });

            Object.defineProperty(gameObject, 'row', {
                get: function () {
                    return this._row;
                },
                set: function (value) {
                    // TODO: check type
                    this._row = value;
                }
            });

            Object.defineProperty(gameObject, 'column', {
                get: function () {
                    return this._column;
                },
                set: function (value) {
                    // TODO: check type
                    this._column = value;
                }
            });

            Object.defineProperty(gameObject, 'id', {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    // TODO: check type
                    this._id = value;
                }
            });

            Object.defineProperty(gameObject, 'type', {
                get: function () {
                    return this._type;
                },
                set: function (value) {
                    // TODO: check type
                    this._type = value;
                }
            });

            return gameObject
        }());

// ----------- PLAYER ----------------

        var player = (function (parent) {
            var player = Object.create(parent);

            Object.defineProperty(player, 'init', {
                value: function (initialRow, initialCol, startAnimation, animations) {
                    var self = this;
                    // var animation = getRandomEnemyAnimation();

                    console.log('row =-' + initialRow + ' col  ' + initialCol);

                    parent.init.call(self, initialRow, initialCol, startAnimation, animations, gameObjectType.player);

                    //this.direction = getRandomDirection();
                    //console.log(this.direction);

                    return this;
                }
            });

            //Object.defineProperty(player, 'direction', {
            //    get: function () {
            //        return this._direction;
            //    },
            //    set: function (value) {
            //        this._direction = value;
            //    }
            //});

            return player;

        }(gameObject));

// ----------- ENEMY ----------------

        var enemy = (function (parent) {
            var enemy = Object.create(parent);

            Object.defineProperty(enemy, 'init', {
                value: function (initialRow, initialCol, startAnimation) {
                    var self = this;
                    var animation = getRandomEnemyAnimation();

                    parent.init.call(self, initialRow, initialCol, startAnimation, animation, gameObjectType.enemy);

                    this.direction = getRandomDirection();
                    //console.log(this.direction);

                    return this;
                }
            });

            Object.defineProperty(enemy, 'direction', {
                get: function () {
                    return this._direction;
                },
                set: function (value) {
                    this._direction = value;
                }
            });

            // change enemy's movement direction when an obstacle is is reach
            // try to change the direction that can be taken
            Object.defineProperty(enemy, 'change_direction', {
                value: function (grid) {
                    var oldDirection = this.direction;
                    var moves = ['left', 'right', 'up', 'down'];
                    var move = helpers.getRandomInt(0, 3);

                    //console.log('possible ' + helpers.isPossiblePlayerMove(moves[move], this, grid, true));

                    while (oldDirection == moves[move] && helpers.isPossiblePlayerMove(moves[move], this, grid, true) == false) {
                        move = helpers.getRandomInt(0, 3);
                        //console.log(move)
                    }

                    this.direction = moves[move];
                }
            });

            return enemy;

        }(gameObject));

// ----------- GATE ----------------
        var gate = (function (parent) {
            var gate = Object.create(parent);

            Object.defineProperty(gate, 'init', {
                value: function (initialRow, initialCol, startAnimation, animations) {
                    var self = this;

                    parent.init.call(self, initialRow, initialCol, startAnimation, animations, gameObjectType.gate);

                    this.locked = true;

                    return self;
                }
            });


            return gate;
        }(gameObject));


// ----- stage -------------------------------------
        var stage = (function () {
            var stage = Object.create({});

            Object.defineProperty(stage, 'init', {
                value: function (containerId, width, height) {
                    var self = this;

                    self.stage = new Kinetic.Stage({
                            container: containerId,
                            width: width,
                            height: height
                        }
                    );

                    return self;
                }
            });

            Object.defineProperty(stage, 'add', {
                value: function (value) {
                    this.stage.add(value);

                    return this;
                }
            });

            Object.defineProperty(stage, 'stage', {
                get: function () {
                    return this._stage;
                },
                set: function (value) {
                    // TODO: check type
                    this._stage = value;
                }
            });

            return stage
        }());

// ----- layer prototype -------------------------------------
        var layer = (function () {
            var layer = Object.create({});

            Object.defineProperty(layer, 'init', {
                value: function () {
                    var self = this;

                    self.layer = new Kinetic.Layer();

                    return self;
                }
            });

            Object.defineProperty(layer, 'draw', {
                value: function () {
                    this.layer.draw()
                }
            });

            Object.defineProperty(layer, 'add', {
                value: function (value) {
                    this._layer.add(value);

                    return this;
                }
            });

            Object.defineProperty(layer, 'remove', {
                value: function (value) {
                    this._layer.remove(value);

                    return this;
                }
            });

            Object.defineProperty(layer, 'layer', {
                get: function () {
                    return this._layer;
                },
                set: function (value) {
                    // TODO: check type
                    this._layer = value;
                }
            });

            return layer
        }());

// ----- background -------------------------------------

        var background = (function (parent) {
            var background = Object.create(gameObject);


            Object.defineProperty(background, 'init', {
                value: function (initialRow, initialCol) {
                    var self = this;

                    parent.init.call(self, initialRow, initialCol, animationStates.move, sprites.background);

                    self.sprite.image(backgroundImage);
                    self.sprite.frameRate(24);

                    return this;
                }
            });

            return background;
        }(gameObject));


// ----- setScene -------------------------------------

        return {
            getStage: function (id, width, height) {
                return Object.create(stage).init(id, width, height);
            },
            getLayer: function () {
                return Object.create(layer).init();
            },
            getPlayer: function (row, col) {
                return Object.create(player).init(row, col, animationStates.idle, sprites.player);
            },
            getEnemy: function (row, col) {
                return Object.create(enemy).init(row, col, animationStates.move);
            },
            getStone: function (row, col) {
                return Object.create(gameObject).init(row, col, animationStates.stone, sprites.stone, gameObjectType.stone);
            },
            getBrick: function (row, col) {
                return Object.create(gameObject).init(row, col, animationStates.brick, sprites.brick, gameObjectType.brick);
            },
            getGate: function (row, col) {
                return Object.create(gate).init(row, col, animationStates.locked, sprites.gate);
            },
            getPath: function (row, col) {
                return Object.create(gameObject).init(row, col, animationStates.idle, sprites.empty, gameObjectType.empty);
            },
            getCoin: function (row, col) {
                return Object.create(gameObject).init(row, col, animationStates.idle, sprites.coin, gameObjectType.coin);
            },
            getBomb: function (row, col) {
                return Object.create(gameObject).init(row, col, animationStates.idle, sprites.ice, gameObjectType.bomb);
            },
            getBackground: function (row, col) {
                return Object.create(background).init(0, 0);
            },
            getFire: function (row, col) {
                return Object.create(gameObject).init(row, col, animationStates.idle, sprites.fire, gameObjectType.fire);
            }
        }
    }());


    // --------------- GAME MODULE  --------------------

    var game = (function (gameAssetsBuilder) {
        var game = Object.create({});

        function buildField(g, grid) {
            var r,
                c,
                lenRows = grid.length,
                lenCols = grid[0].length,
                val;

            for (r = 0; r < lenRows; r += 1) {
                for (c = 0; c < lenCols; c += 1) {
                    val = grid[r][c];

                    switch (val) {
                        case gameObjectType.stone:
                            var newStone = gameAssetsBuilder.getStone(r, c);
                            g.stone_layer.add(newStone.sprite);
                            newStone.start();
                            g.stones.push(newStone);
                            break;
                        case gameObjectType.player:
                            var newPlayer = gameAssetsBuilder.getPlayer(r, c);
                            g.player_layer.add(newPlayer.sprite);
                            newPlayer.start();
                            g.player = newPlayer;
                            //
                            //console.log(newPlayer)
                            //console.log(r)
                            //console.log(c)

                            break;
                        case gameObjectType.coin:
                            var newCoin = gameAssetsBuilder.getCoin(r, c);
                            g.coin_layer.add(newCoin.sprite);
                            newCoin.start();
                            g.coins.push(newCoin);
                            break;
                        case gameObjectType.enemy:
                            var newEnemy = gameAssetsBuilder.getEnemy(r, c);
                            g.enemies_layer.add(newEnemy.sprite);
                            newEnemy.start();
                            g.enemies.push(newEnemy);
                            //console.log(newEnemy)
                            //console.log(c)
                            break;
                        case gameObjectType.gate:
                            var newGate = gameAssetsBuilder.getGate(r, c);
                            g.gate_layer.add(newGate.sprite);
                            newGate.start();
                            g.gate = newGate;
                            break;
                    }
                }
            }
        }

        function moveGameObject(direction, gameObject, grid) {
            var cur;

            switch (direction) {
                case DIRECTIONS.right:
                    //console.log(gameObject.column);
                    gameObject.column += 1;
                    cur = [gameObject.row, gameObject.column];
                    //move player
                    gameObject.move({row: gameObject.row, col: gameObject.column});
                    //update player's column
                    //console.log(gameObject.column);

                    break;
                case DIRECTIONS.left:

                    gameObject.column -= 1;
                    cur = [gameObject.row, gameObject.column];
                    gameObject.move({row: gameObject.row, col: gameObject.column});

                    break;
                case DIRECTIONS.down:

                    gameObject.row += 1;
                    cur = [gameObject.row, gameObject.column];
                    gameObject.move({row: gameObject.row, col: gameObject.column});

                    break;
                case DIRECTIONS.up:

                    gameObject.row -= 1;
                    cur = [gameObject.row, gameObject.column];
                    gameObject.move({row: gameObject.row, col: gameObject.column});

                    break;
            }

            return cur;
        }

        //function
        Object.defineProperty(game, 'init', {
            value: function (grid) {

                var self = this;
                self.grid = grid;
                self.stage = gameAssetsBuilder.getStage(CONSTANTS.CANVAS_ID,
                    CONSTANTS.FIELD_COLS * CONSTANTS.CELL_DIMENSIONS,
                    CONSTANTS.FIELD_ROLLS * CONSTANTS.CELL_DIMENSIONS);
                self.startTime = Math.floor(Date.now() / 1000);
                self.endTime = -1;
                self.timeCompleted = 0;
                self.lives = 3;
                self.points = 0;
                self.player_layer = gameAssetsBuilder.getLayer();
                self.enemies_layer = gameAssetsBuilder.getLayer();
                self.path_layer = gameAssetsBuilder.getLayer();
                self.stone_layer = gameAssetsBuilder.getLayer();
                self.gate_layer = gameAssetsBuilder.getLayer();
                self.bomb_layer = gameAssetsBuilder.getLayer();
                self.coin_layer = gameAssetsBuilder.getLayer();
                self.fire_layer = gameAssetsBuilder.getLayer();
                self.coins = [];
                self.stones = [];
                self.enemies = [];
                self.fires = [];
                self.bombs = [];
                self.background = gameAssetsBuilder.getBackground();
                self.path_layer.add(self.background.sprite);
                self.background.sprite.start();


                self.stage.add(self.path_layer.layer);
                self.stage.add(self.gate_layer.layer);
                self.stage.add(self.stone_layer.layer);
                self.stage.add(self.player_layer.layer);
                self.stage.add(self.enemies_layer.layer);
                self.stage.add(self.bomb_layer.layer);
                self.stage.add(self.coin_layer.layer);
                self.stage.add(self.fire_layer.layer);

                buildField(this, grid);

                return this;
            }
        });

        Object.defineProperty(game, 'player_move', {

            value: function (direction) {
                var that = this;
                var canMove = helpers.isPossiblePlayerMove(direction, that.player, that.grid, that.gate.locked);
                if (canMove) {

                    //previous row and column position of the player
                    var prev = [this.player.row, this.player.column];
                    // new row and column position of the player
                    var cur = moveGameObject(direction, this.player, this.grid);
                    this.player_layer.draw();

                    // update the grid matrix values
                    switch (that.grid[cur[0]][cur[1]]) {
                        case 'e':
                            that.remove_life();
                            that.grid[cur[0]][cur[1]] = 'b';
                            that.bomb_layer.draw();
                            break;
                        case 'g':
                            that.endTime = Math.floor(Date.now() / 1000);
                            alert('Level Completed');
                            that.timeCompleted = that.endTime - that.startTime;
                            that.points += that.timeCompleted / 2;
                            //console.log('complete for ' + that.timeCompleted + ' seconds ');
                            //console.log('points: ' + that.points);

                            break;
                        case 'c':
                            that.points += 10;
                            console.log(that.coins)
                            var index = helpers.getIndexOf(that.coins, cur[0], cur[1]);
                            var coin = that.coins[index];
                            coin.sprite.remove();
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
                   // console.log('prev before' + prev + ' ' + enemy.id);

                    var canMove = helpers.isPossiblePlayerMove(enemy.direction, enemy, that.grid, that.gate.locked);
                    if (canMove) {
                        var cur = moveGameObject(enemy.direction, enemy, that.grid);

                        if (that.grid[cur[0]][cur[1]] == 'p') {
                            that.remove_life();
                        } else {
                            that.grid[cur[0]][cur[1]] = 'e';
                        }

                        if (prev[0] == 7) {

                          //  console.log(enemy)
                        }
                        // console.log(that.grid);
                        if (that.grid[prev[0]][prev[1]] == 'e') {
                            that.grid[prev[0]][prev[1]] = '=';
                        }
                    } else {
                        enemy.change_direction(that.grid);
                    }

                    //console.log('prev after' + prev);
                });


                //  console.log('enemy_move')
                that.enemies_layer.draw();
            }
        });

        Object.defineProperty(game, 'remove_life', {

            value: function () {
                this.lives -= 1;
                //  console.log('remaining lives: ' + this.lives);

                if (this.lives < 0) {

                    this.player_layer.layer.remove(this.player.sprite);
                    //  console.log('game over');
                    this.endTime = Math.floor(Date.now() / 1000);
                    this.timeCompleted = this.endTime - this.startTime;
                    //   console.log('complete for '+ this.timeCompleted + ' seconds ');
                    this.points += this.timeCompleted / 2;
                    //console.log('complete for ' + this.timeCompleted + ' seconds ');
                    //console.log('points ' + this.points);
                    this.player_layer.draw();
                } else {
                    this.player.row = 0;
                    this.player.column = 0;
                    this.player.move();
                    this.player_layer.draw();
                    this.grid[0][0] = 'p';
                }
            }
        });

        Object.defineProperty(game, 'put_bomb', {
            value: function () {
                var that = this;

                var newBomb = gameAssetsBuilder.getBomb(that.player.row, that.player.column),
                    positionOfBomb = [that.player.row, that.player.column];

                newBomb.start();

                that.bomb_layer.add(newBomb.sprite);
                that.bombs.push(newBomb);
                that.bomb_layer.draw();
                //console.log(this.bomb_layer);

                setTimeout(function () {
                    that.bombs[0].sprite.remove();
                    that.bombs.shift();
                    that.bomb_layer.draw();

                }, 3000);

                setTimeout(function () {
                    that.show_fire(positionOfBomb);
                }, 2000)


                //this.grid[positionOfBomb[0]][positionOfBomb[1]]='b';
                /*                    for (var i = 0; i < this.grid.length; i += 1) {
                 console.log(this.grid[i])
                 }*/

                return this;
            }
        });

        Object.defineProperty(game, 'perform_fire_objects', {
            value: function (fireObjPosition) {
                var fireObj = gameAssetsBuilder.getFire(fireObjPosition[0], fireObjPosition[1]);
                //console.log(game);
                this.fire_layer.add(fireObj.sprite);
                fireObj.sprite.start();
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

                this.fire_layer.draw();

                setTimeout(function () {
                    that.fires[0].sprite.remove();
                    that.fires[1].sprite.remove();
                    that.fires[2].sprite.remove();
                    that.fires[3].sprite.remove();
                    that.fires.shift();
                    that.fires.shift();
                    that.fires.shift();
                    that.fires.shift();

                    that.fire_layer.draw();
                    that.stone_layer.draw();
                }, 1000);

                return this;
            }
        });

        return game;

    }(gameAssetsBuilder));

    function initGame() {

        var gameSet = [
            ['=', 'p', '+', '+', '=', '+', '+', '=', '='],
            ['+', '=', '+', '+', '=', '+', '+', 'e', '+'],
            ['+', 'c', '=', '=', '=', '+', '+', '=', '='],
            ['=', '=', '+', '=', 'e', '=', '=', '=', '+'],
            ['c', 'c', '+', '+', '=', '+', '+', '=', '+'],
            ['=', '=', '+', '+', '=', '+', '+', '=', '+'],
            ['=', 'e', '+', '+', '=', '+', '+', '=', 'g']
        ];

        var newGame = game.init(gameSet);
        var bar = Object.create(topBarSVG)
            .init('svg-container', CONSTANTS.FIELD_COLS * CONSTANTS.CELL_DIMENSIONS, CONSTANTS.FIELD_COLS * CONSTANTS.CELL_DIMENSIONS);

        setInterval(function () {
            newGame.enemy_move();
            bar.updateLives(newGame.lives)
            bar.updateIce(newGame.points)
            // console.log(game.enemies)
            // console.log('--------------------------');
            //
            // for (var i = 0; i < 7; i++) {
            //     console.log(newGame.grid[i]);
            // }

            //  console.log('--------------------------');

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
    }
};


//function buildGrid()
// --------------- GAME LOOP  --------------------

//    initGame();
//
//    var lastTime;
//
//
//    function gameLoop() {
//        var now = Date.now();
//        var dt = (now - lastTime) / 1000.0;
//
//        update(dt);
//        render();
//
//        lastTime = now;
//        requestAnimFrame(main);
//    }




