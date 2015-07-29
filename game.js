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
            empty: animationEmpty
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
            trap: 'trap'
        },
        gameObjectType = {
            player: 'p',
            stone: '+',
            brick: '.',
            enemy: 'e',
            empty: '=',
            path: '=',
            coin: 'c',
            gate: 'g'
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

    var common = (function () {

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

        //},

        return {
            getRandomInt: getRandomInt,
            getNextGridElem: getNextGridElem,
            isPossiblePlayerMove: isPossiblePlayerMove
        }
    }());


// --------------- GAME ASSETS MODULE --------------------
    var gameAssetsBuilder = (function () {

// ----- ID -------------------------------------
        var nextID = 0;

        function getRandomDirection() {
            var moves = [DIRECTIONS.left, DIRECTIONS.right, DIRECTIONS.up, DIRECTIONS.down];
            var move = common.getRandomInt(0, 3);

            return moves[move];
        }

        function getRandomEnemyAnimation() {
            var states = ['enemySun', 'enemyHedgehog'];
            var state = common.getRandomInt(0, 1);

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
                        x: initialRow * CONSTANTS.CELL_DIMENSIONS,
                        y: initialCol * CONSTANTS.CELL_DIMENSIONS,
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
                value: function (initialX, initialY, startAnimation, animations) {
                    this.sprite.start();

                    return this;
                }
            });

            Object.defineProperty(gameObject, 'move', {
                value: function (direction) {
                    this.sprite.setY(direction.row * CONSTANTS.CELL_DIMENSIONS);
                    this.sprite.setX(direction.col * CONSTANTS.CELL_DIMENSIONS);

                    //console.log(direction.row * CONSTANTS.CELL_DIMENSIONS)
                    //console.log(direction.col * CONSTANTS.CELL_DIMENSIONS)

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
                value: function (initialRow, initialCol, startAnimation) {
                    var self = this;
                    var animation = getRandomEnemyAnimation();

                    parent.init.call(self, initialRow, initialCol, startAnimation, animation, gameObjectType.enemy);

                    this.direction = getRandomDirection();
                    //console.log(this.direction);

                    return this;
                }
            });

            Object.defineProperty(player, 'direction', {
                get: function () {
                    return this._direction;
                },
                set: function (value) {
                    this._direction = value;
                }
            });

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
                    var move = common.getRandomInt(0, 3);

                    while (oldDirection == moves[move] && common.isPossiblePlayerMove(moves[move], this, grid, true) == false) {
                        move = common.getRandomInt(0, 3);
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


// ----- setScene -------------------------------------

        return {
            getStage: function (id, width, height) {
                return Object.create(stage).init(id, width, height);
            },
            getLayer: function () {
                return Object.create(layer).init();
            },
            getPlayer: function (x, y) {
                return Object.create(gameObject).init(x, y, animationStates.idle, sprites.player, gameObjectType.player);
            },
            getEnemy: function (x, y) {
                return Object.create(enemy).init(x, y, animationStates.move);
            },
            getStone: function (x, y) {
                return Object.create(gameObject).init(x, y, animationStates.stone, sprites.stone, gameObjectType.stone);
            },
            getBrick: function (x, y) {
                return Object.create(gameObject).init(x, y, animationStates.brick, sprites.brick, gameObjectType.brick);
            },
            getGate: function (x, y) {
                return Object.create(gate).init(x, y, animationStates.locked, sprites.gate);
            },
            getPath: function (x, y) {
                return Object.create(gameObject).init(x, y, animationStates.idle, sprites.empty, gameObjectType.empty);
            }
        };
    }());


    // --------------- GAME MODULE  --------------------

    var game = (function (gameAssetsBuilder) {
        var game = Object.create({});

        function buildField(g, grid) {
            grid.forEach(function (row, r) {
                row.forEach(function (val, c) {
                    switch (val) {
                        case gameObjectType.empty:
                            var newPath = gameAssetsBuilder.getPath(c, r);
                            g.path_layer.add(newPath.sprite);
                            newPath.start();
                            g.paths.push(newPath);
                            break;
                        case gameObjectType.stone:
                            var newStone = gameAssetsBuilder.getStone(c, r);
                            g.stone_layer.add(newStone.sprite);
                            newStone.start();
                            g.stones.push(newStone);
                            break;
                        case gameObjectType.player:
                            var newPath = gameAssetsBuilder.getPath(c, r);
                            g.path_layer.add(newPath.sprite);
                            g.paths.push(newPath);
                            var newPlayer = gameAssetsBuilder.getPlayer(c, r);
                            g.player_layer.add(newPlayer.sprite);
                            newPlayer.start();
                            g.player = newPlayer;
                            break;
                        case gameObjectType.enemy:
                            var newPath = gameAssetsBuilder.getPath(c, r);
                            g.path_layer.add(newPath.sprite);
                            g.paths.push(newPath);
                            var newEnemy = gameAssetsBuilder.getEnemy(c, r);
                            g.enemies_layer.add(newEnemy.sprite);
                            newEnemy.start();
                            g.enemies.push(newEnemy);
                            break;
                        case gameObjectType.gate:
                            var newGate = gameAssetsBuilder.getGate(c, r);
                            g.gate_layer.add(newGate.sprite);
                            newGate.start();
                            g.gate = newGate;
                            break
                    }
                });
            });
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

        function isPossiblePlayerMove(direction, gameObject, grid, gate_status) {
            var nextGridElem = getNextGridElem(direction, [gameObject.row, gameObject.column], grid);
            if (nextGridElem == 'g' && gate_status === false) {
                return true;
            }
            if (nextGridElem !== -1 && nextGridElem != '+') {
                return true;
            }

            return false;
        }

        function moveGameObject(direction, gameObject, grid) {
            var cur;

            switch (direction) {
                case DIRECTIONS.right:
                    console.log(gameObject.column);
                    gameObject.column += 1;
                    cur = [gameObject.row, gameObject.column];
                    //move player
                    gameObject.move({row: gameObject.row, col: gameObject.column});
                    //update player's column
                    console.log(gameObject.column);

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
            //console.log(player.row)
            //console.log(player.column)
            //console.log(cur)

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

                self.player_layer = gameAssetsBuilder.getLayer();
                self.enemies_layer = gameAssetsBuilder.getLayer();
                self.path_layer = gameAssetsBuilder.getLayer();
                self.stone_layer = gameAssetsBuilder.getLayer();
                self.gate_layer = gameAssetsBuilder.getLayer();
                self.paths = [];
                self.stones = [];
                self.enemies = [];

                self.stage.add(self.gate_layer.layer);
                self.stage.add(self.path_layer.layer);
                self.stage.add(self.stone_layer.layer);
                self.stage.add(self.player_layer.layer);
                self.stage.add(self.enemies_layer.layer);

                buildField(this, grid);

                return this;
            }
        });

        Object.defineProperty(game, 'player_move', {

            value: function (direction) {
                var canMove = common.isPossiblePlayerMove(direction, this.player, this.grid, this.gate.locked);

                if (canMove) {

                    //previous row and column position of the player
                    var prev = [this.player.row, this.player.column];
                    // new row and column position of the player
                    var cur = moveGameObject(direction, this.player, this.grid);
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

            value: function () {var that = this;
                this.enemies.forEach(function(enemy){
                    var prev = [enemy.row, enemy.column];

                    var canMove = common.isPossiblePlayerMove(enemy.direction, enemy, that.grid,that.gate.locked);

                    if(canMove){
                        var cur =  moveGameObject(enemy.direction, enemy, that.grid);
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

    }(gameAssetsBuilder));

    function initGame() {

        var gameSet = [
            ['p', '=', '+', '+', '=', '+', '+', '=', '='],
            ['+', '=', '+', '+', '=', '+', '+', '=', '+'],
            ['+', '=', '=', '=', '=', '+', '+', '=', '='],
            ['=', '=', '+', '=', '=', 'e', '=', '=', '+'],
            ['=', '=', '+', '+', '=', '+', '+', '=', '+'],
            ['=', '=', '+', '+', '=', '+', '+', '=', '+'],
            ['=', 'e', '+', '+', '=', '+', '+', 'e', 'g']
        ];

        var newGame = game.init(gameSet);

        setInterval(function () {
            game.enemy_move();

            console.log(game.grid)

        }, 1000);

        window.onkeydown = function (ev) {
            if (ev.keyCode === 38) {
                game.player_move('up');
            }
            else if (ev.keyCode === 37) {
                game.player_move('left');
            } else if (ev.keyCode === 39) {
                game.player_move('right');
            } else if (ev.keyCode === 40) {
                game.player_move('down');
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




