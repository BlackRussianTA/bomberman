// ------------------------------------------- GAME ----------------------------------------------
window.onload= function () {
    var CONSTANTS_GLOBAL = {
            SPRITE_IMAGE_PATH: 'images/Players/sprite-sheet.png'
        },
        spriteImage = new Image();

    spriteImage.src = CONSTANTS_GLOBAL.SPRITE_IMAGE_PATH;

    spriteImage.onload = initGame;

    var gameModule = (function () {
        var CONSTANTS = {
                SPRITE_IMAGE_PATH: '',
                CANVAS_ID: '',
                CELL_DIMENSIONS: 0,
                SPRITES_FRAME_RATE: 6,
                SCALE: 0,
                POINTS_GAINED_STONE: 0,
                POINTS_GAINED_ENEMY: 50,
                POINTS_GAINED_COINS: 50,
                POINTS_GAINED_GATE: 100,
                POINTS_REMOVE_LIVE: -100,
                GAME_LOOP_INTERVAL: 1000
            },
            sprites = {
                player: animationPlayer,
                enemySun: animationEnemyOne,
                enemyHedgehog: animationEnemyTwo,
                stone: {stone: animationBox.stone},
                brick: {brick: animationBox.brick},
                gate: animationGate,
                ice: animationIce,
                background: animationBackground,
                fire: animationFire,
                coin: animationCoin,
                bomb: animationBomb
            },
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

                    return type
                }

                function isPossiblePlayerMove(direction, gameObject, grid, gate_locked) {
                    var nextGridElem = getNextGridElem(direction, [gameObject.row, gameObject.column], grid);

                    if (nextGridElem == 'g' && gate_locked === false) {
                        return true;
                    } else if (nextGridElem != -1 && nextGridElem != '+' && nextGridElem != 'g') {
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
            }()
        );

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
                        var that = this;

                        that.row = initialRow;
                        that.column = initialCol;
                        that.type = gameObjectType;
                        that.id = ++nextID;

                        that.sprite = new Kinetic.Sprite({
                            x: that.column * CONSTANTS.CELL_DIMENSIONS,
                            y: that.row * CONSTANTS.CELL_DIMENSIONS,
                            image: spriteImage,
                            animations: animations,
                            animation: startAnimation,
                            frameRate: CONSTANTS.SPRITES_FRAME_RATE,
                            frame: 0
                        });

                        that.sprite.scale({x: CONSTANTS.SCALE, y: CONSTANTS.SCALE});

                        return that;
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
                        var that = this;

                        console.log('row =-' + initialRow + ' col  ' + initialCol);

                        parent.init.call(that, initialRow, initialCol, startAnimation, animations, gameObjectType.player);

                        return this;
                    }
                });

                return player;

            }(gameObject));

// ----------- ENEMY ----------------

            var enemy = (function (parent) {
                var enemy = Object.create(parent);

                Object.defineProperty(enemy, 'init', {
                    value: function (initialRow, initialCol, startAnimation) {
                        var that = this;
                        var animation = getRandomEnemyAnimation();

                        parent.init.call(that, initialRow, initialCol, startAnimation, animation, gameObjectType.enemy);

                        this.direction = getRandomDirection();

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

                        while (oldDirection == moves[move] && helpers.isPossiblePlayerMove(moves[move], this, grid, true) == false) {
                            move = helpers.getRandomInt(0, 3);
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
                        var that = this;

                        parent.init.call(that, initialRow, initialCol, startAnimation, animations, gameObjectType.gate);

                        this.locked = true;

                        return that;
                    }
                });


                return gate;
            }(gameObject));


// ----- stage -------------------------------------
            var stage = (function () {
                var stage = Object.create({});

                Object.defineProperty(stage, 'init', {
                    value: function (containerId, width, height) {
                        var that = this;

                        that.stage = new Kinetic.Stage({
                                container: containerId,
                                width: width,
                                height: height
                            }
                        );

                        return that;
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
                        var that = this;

                        that.layer = new Kinetic.Layer();

                        return that;
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
                        var that = this;

                        parent.init.call(that, initialRow, initialCol, animationStates.move, sprites.background);

                        that.sprite.image(spriteImage);
                        that.sprite.frameRate(24);
                        that.sprite.scale({x: 1, y: 1});

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

// --------------- GAME  --------------------

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
                                g.maxLevelPoints += CONSTANTS.POINTS_GAINED_STONE;
                                break;
                            case gameObjectType.player:
                                var newPlayer = gameAssetsBuilder.getPlayer(r, c);
                                g.player_layer.add(newPlayer.sprite);
                                newPlayer.start();
                                g.player = newPlayer;
                                break;
                            case gameObjectType.coin:
                                var newCoin = gameAssetsBuilder.getCoin(r, c);
                                g.coin_layer.add(newCoin.sprite);
                                newCoin.start();
                                g.coins.push(newCoin);
                                g.maxLevelPoints += CONSTANTS.POINTS_GAINED_COINS;
                                break;
                            case gameObjectType.enemy:
                                var newEnemy = gameAssetsBuilder.getEnemy(r, c);
                                g.enemies_layer.add(newEnemy.sprite);
                                newEnemy.start();
                                g.enemies.push(newEnemy);
                                g.maxLevelPoints += CONSTANTS.POINTS_GAINED_ENEMY;
                                break;
                            case gameObjectType.gate:
                                var newGate = gameAssetsBuilder.getGate(r, c);
                                g.gate_layer.add(newGate.sprite);
                                newGate.start();
                                g.gate = newGate;
                                g.maxLevelPoints += CONSTANTS.POINTS_GAINED_GATE;
                                break;
                        }
                    }
                }
            }

            function moveGameObject(direction, gameObject, grid) {
                var cur;

                switch (direction) {
                    case DIRECTIONS.right:
                        gameObject.column += 1;
                        cur = [gameObject.row, gameObject.column];
                        gameObject.move({row: gameObject.row, col: gameObject.column})

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

            Object.defineProperty(game, 'init', {
                value: function (grid, cellDimensions, scale, canvasID) {
                    var that = this;

                    CONSTANTS.CELL_DIMENSIONS = cellDimensions;
                    CONSTANTS.SCALE = scale;
                    CONSTANTS.CANVAS_ID = canvasID;

                    that.grid = grid;
                    that.stage = gameAssetsBuilder.getStage(CONSTANTS.CANVAS_ID,
                        grid[0].length * CONSTANTS.CELL_DIMENSIONS,
                        grid.length * CONSTANTS.CELL_DIMENSIONS);
                    that.startTime = Math.floor(Date.now() / CONSTANTS.GAME_LOOP_INTERVAL);
                    that.endTime = -1;
                    that.timeCompleted = 0;
                    that.lives = 3;
                    that.points = 0;
                    that.maxLevelPoints = 0;
                    that.player_layer = gameAssetsBuilder.getLayer();
                    that.enemies_layer = gameAssetsBuilder.getLayer();
                    that.path_layer = gameAssetsBuilder.getLayer();
                    that.stone_layer = gameAssetsBuilder.getLayer();
                    that.gate_layer = gameAssetsBuilder.getLayer();
                    that.bomb_layer = gameAssetsBuilder.getLayer();
                    that.coin_layer = gameAssetsBuilder.getLayer();
                    that.fire_layer = gameAssetsBuilder.getLayer();
                    that.coins = [];
                    that.stones = [];
                    that.enemies = [];
                    that.fires = [];
                    that.bombs = [];
                    that.background = gameAssetsBuilder.getBackground();
                    that.path_layer.add(that.background.sprite);
                    that.background.sprite.start();
                    that.gameOver = false;
                    that.gameComplete = false;

                    that.stage.add(that.path_layer.layer);
                    that.stage.add(that.gate_layer.layer);
                    that.stage.add(that.player_layer.layer);
                    that.stage.add(that.enemies_layer.layer);
                    that.stage.add(that.bomb_layer.layer);
                    that.stage.add(that.coin_layer.layer);
                    that.stage.add(that.fire_layer.layer);
                    that.stage.add(that.stone_layer.layer);

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
                                // that.grid[cur[0]][cur[1]] = 'b';
                                that.bomb_layer.draw();
                                break;
                            case 'g':
                                that.endTime = Math.floor(Date.now() / 1000);
                                //alert('Level Completed ' + that.points + ' ' + that.maxLevelPoints);
                                that.timeCompleted = that.endTime - that.startTime;
                                that.points += CONSTANTS.POINTS_GAINED_GATE;
                                that.points += that.timeCompleted / 2;
                                if (that.points > that.maxLevelPoints) {
                                    that.points = that.maxLevelPoints;
                                }
                                that.gameComplete = true;

                                break;
                            case 'c':
                                that.points += CONSTANTS.POINTS_GAINED_COINS;

                                if (that.points > that.maxLevelPoints) {
                                    that.points = that.maxLevelPoints;
                                }
                                var index = helpers.getIndexOf(that.coins, cur[0], cur[1]);
                                var coin = that.coins[index];
                                coin.sprite.remove();
                                that.coin_layer.draw();
                                that.coins.splice(index, 1);
                            default:
                                that.grid[cur[0]][cur[1]] = 'p';
                                break;
                        }

                        if (this.grid[prev[0]][prev[1]] == 'p') {
                            this.grid[prev[0]][prev[1]] = '=';
                        }
                    }

                    return this;
                }
            });

            Object.defineProperty(game, 'enemy_move', {

                value: function () {
                    var that = this;

                    this.enemies.forEach(function (enemy) {
                        var prev = [enemy.row, enemy.column],
                            canMove = helpers.isPossiblePlayerMove(enemy.direction, enemy, that.grid, true);
                        if (canMove) {
                            var cur = moveGameObject(enemy.direction, enemy, that.grid);

                            if (that.grid[cur[0]][cur[1]] == 'p') {
                                that.remove_life();
                            } else if (that.grid[cur[0]][cur[1]] == '=') {

                                that.grid[cur[0]][cur[1]] = 'e';
                            }

                            if (that.grid[prev[0]][prev[1]] == 'e') {
                                that.grid[prev[0]][prev[1]] = '=';
                            }
                        } else {
                            enemy.change_direction(that.grid);
                        }
                    });

                    that.enemies_layer.draw();

                    return this;
                }
            });

            Object.defineProperty(game, 'remove_life', {

                value: function () {
                    var that = this;

                    that.lives -= 1;

                    if (that.lives <= 0) {

                        that.gameOver = true;
                        if (that.lives < 0) {
                            that.lives = 0;
                        }

                        that.player_layer.layer.remove(that.player.sprite);

                        //  console.log('game over');
                        that.endTime = Math.floor(Date.now() / CONSTANTS.GAME_LOOP_INTERVAL);
                        that.timeCompleted = that.endTime - that.startTime;

                        //   console.log('complete for '+ this.timeCompleted + ' seconds ');
                        that.points += that.timeCompleted / 2;

                        if (that.points > that.maxLevelPoints) {
                            that.points = that.maxLevelPoints;
                        }

                        that.player_layer.draw();
                    } else {
                        that.points += CONSTANTS.POINTS_REMOVE_LIVE;
                        if (that.points < 0) {
                            that.points = 0;
                        }
                        that.player.row = 0;
                        that.player.column = 0;
                        this.player.move();
                        that.grid[0][0] = gameObjectType.player;
                        that.player_layer.draw();
                    }

                    return this;
                }
            });

            Object.defineProperty(game, 'put_bomb', {
                value: function () {
                    var that = this;

                    var newBomb = gameAssetsBuilder.getBomb(that.player.row, that.player.column),
                        positionOfBomb = [that.player.row, that.player.column];

                    that.bomb_layer.add(newBomb.sprite);
                    newBomb.start();
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

                    return that;
                }
            });

            Object.defineProperty(game, 'perform_fire_objects', {
                value: function (fireObjPosition) {
                    var that = this,
                        fireObj = gameAssetsBuilder.getFire(fireObjPosition[0], fireObjPosition[1]);

                    that.fire_layer.add(fireObj.sprite);
                    fireObj.sprite.start();
                    that.fires.push(fireObj);

                    return that;
                }
            });

            Object.defineProperty(game, 'show_fire', {
                value: function (positionOfBomb) {
                    var
                        that = this,
                        NUMBER_OF_FIRE_OBJECTS = 4,
                        positionsOfFireUp = [positionOfBomb[0] - 1, positionOfBomb[1]],
                        positionsOfFireDown = [positionOfBomb[0] + 1, positionOfBomb[1]],
                        positionsOfFireLeft = [positionOfBomb[0], positionOfBomb[1] - 1],
                        positionsOfFireRight = [positionOfBomb[0], positionOfBomb[1] + 1];

                    that.perform_fire_objects(positionsOfFireUp);
                    that.perform_fire_objects(positionsOfFireDown);
                    that.perform_fire_objects(positionsOfFireLeft);
                    that.perform_fire_objects(positionsOfFireRight);

                    that.fire_layer.draw();

                    setTimeout(function () {
                        that.kill_creatures_in_the_range(positionsOfFireUp);
                        that.kill_creatures_in_the_range(positionsOfFireDown);
                        that.kill_creatures_in_the_range(positionsOfFireLeft);
                        that.kill_creatures_in_the_range(positionsOfFireRight);
                        that.kill_creatures_in_the_range(positionOfBomb);
                        that.enemies_layer.draw();

                        that.fires[0].sprite.remove();
                        that.fires[1].sprite.remove();
                        that.fires[2].sprite.remove();
                        that.fires[3].sprite.remove();
                        that.fires.shift();
                        that.fires.shift();
                        that.fires.shift();
                        that.fires.shift();


                        that.fire_layer.draw();
                        // that.stone_layer.draw();
                    }, 1000);

                    return that;
                }
            });

            Object.defineProperty(game, 'kill_creatures_in_the_range', {
                value: function (killingCoordinates) {
                    var that = this;

                    for (var i = 0; i < that.enemies.length; i += 1) {
                        if (that.enemies[i].row == killingCoordinates[0]
                            && that.enemies[i].column == killingCoordinates[1]) {
                            that.enemies[i].sprite.remove();
                            that.enemies.splice(i, 1);
                            that.grid[killingCoordinates[0]][killingCoordinates[1]] = '=';
                            that.points += CONSTANTS.POINTS_GAINED_ENEMY;
                            this.path_layer.draw();
                        }
                    }

                    if (that.player.row == killingCoordinates[0] && this.player.column == killingCoordinates[1]) {
                        that.remove_life();
                    }

                    if (that.gate.row == killingCoordinates[0] && this.gate.column == killingCoordinates[1]) {
                        that.gate.locked = false;
                        that.gate.sprite.animation(animationStates.opened);
                        that.gate_layer.draw();
                    }

                    return this;
                }
            });

            return game

        }(gameAssetsBuilder));

        return {
            getGame: function (grid, cellDimensions, scale, canvasID) {
                return Object.create(game).init(grid, cellDimensions, scale, canvasID)
            }
        }

    }());

    function initGame() {
        var CONSTANTS = {
            SPRITE_IMAGE_PATH: 'images/Players/sprite-sheet.png',
            CANVAS_ID: 'kinetic-canvas',
            CELL_DIMENSIONS: 72,
            SCALE: 0.5,
            GAME_REFRESH_INTERVAL: 1000
        };

        var gameSet = [
            ['=', 'p', '+', '+', '=', '+', '+', '=', '='],
            ['+', '=', '+', '+', 'e', '+', '+', 'e', '+'],
            ['+', 'c', '=', '=', '=', '+', '+', '=', '='],
            ['=', '=', '+', '=', '=', '=', '=', '=', '+'],
            ['c', 'c', '+', '+', '=', '+', '+', '=', '+'],
            ['=', '=', '+', '+', 'e', '+', '+', '=', '+'],
            ['=', 'e', '+', '+', '=', '+', '+', '=', 'g']
        ];

        var newGame = gameModule.getGame(gameSet, CONSTANTS.CELL_DIMENSIONS, CONSTANTS.SCALE, CONSTANTS.CANVAS_ID);
        var bar = Object.create(topBarSVG)
            .init('svg-container', newGame.grid[0].length * CONSTANTS.CELL_DIMENSIONS, newGame.grid.length * CONSTANTS.CELL_DIMENSIONS);
        var canUpdateTopBar = false;

        setTimeout(function () {
            canUpdateTopBar = true;
        }, 2000);

        var gameLoop = setInterval(function () {
            newGame.enemy_move();

            if (canUpdateTopBar) {
                bar.updateLives(newGame.lives);
                bar.updateIce(newGame.points);
                bar.updateRatioBars(newGame.points, newGame.maxLevelPoints);
            }

            //console.log('--------------------------');
            //for (var i = 0; i < 7; i++) {
            //    console.log(newGame.grid[i]);
            //}
            //console.log('--------------------------');

            if (newGame.gameOver) {
                stopGameLoop();
                getHighScore(newGame.points);
                showFinalScreen();
                //SOME FUNC TO CALL GAME MENU
            }

            if (newGame.gameComplete) {
                stopGameLoop();
                //SOME FUNC TO CALL GAME MENU
            }


        }, CONSTANTS.GAME_REFRESH_INTERVAL);

        window.onkeydown = function (ev) {
            if (ev.keyCode === 38 || ev.keyCode === 87) {
                newGame.player_move('up');
            }
            else if (ev.keyCode === 37 || ev.keyCode === 65) {
                newGame.player_move('left');
            } else if (ev.keyCode === 39 || ev.keyCode === 68) {
                newGame.player_move('right');
            } else if (ev.keyCode === 40 || ev.keyCode === 83) {
                newGame.player_move('down');
            } else if (ev.keyCode === 32 || ev.keyCode === 66) {
                newGame.put_bomb();
            }
        };

        function stopGameLoop() {
            clearInterval(gameLoop)
        }
    }
};



