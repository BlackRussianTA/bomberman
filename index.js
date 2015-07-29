function game() {
    var module = (function () {
        var player,
            stone,
            path,
            enemy,
            gate,
            game,
            validator,
            CONSTANTS = {
                DIV_ID: 'kinetic-canvas',
                BOX_WIDTH: 64,
                BOX_HEIGHT: 64,
                PLAYER_IMG_SRC: 'images/player_walk2.png',
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
                                break
                        }
                    });
                });
            },
            getNextGridElem: function (direction, position, grid) {
                var type = -1;
                console.log(direction);
                switch (direction) {
                    case 'right':
                        if (grid[position[0]][position[1] + 1]) {
                            type = grid[position[0]][position[1] + 1];
                        }
                        break;
                    case 'left':
                        if (grid[position[0]][position[1] - 1]) {
                            type = grid[position[0]][position[1] - 1];
                        }
                        break;
                    case 'down':
                        if (grid[position[0] + 1][position[1]]) {
                            type = grid[position[0] + 1][position[1]];
                        }
                        break;
                    case 'up':
                        if (grid[position[0] - 1][position[1] ]) {
                            type = grid[position[0] - 1][position[1]];
                        }
                        break;
                }
                return type;
            },
            isPossiblePlayerMove: function (direction, player, grid) {
                var nextGridElem = this.getNextGridElem(direction, [player.row, player.column], grid);
                if (nextGridElem !== -1 && nextGridElem != '+') {
                    return true;
                }
                return false;
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

            Object.defineProperty(player, 'addPlaylist', {
                value: function (playlist) {
                    validator.validateIfUndefined(playlist, 'Player add playlist parameter');
                    if (playlist.id === undefined) {
                        throw new Error('Player add playlist parameter must have id');
                    }

                    this._playlists.push(playlist);
                    return this;
                }
            });

            return player;
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
            var currentId = 0,
                game = Object.create({});
            Object.defineProperty(game, 'init', {
                value: function (grid) {
                    this.grid = grid;
                    this.stage = helpers.createStage(grid);
                    this.player_layer = new Kinetic.Layer();
                    this.path_layer = new Kinetic.Layer();
                    this.stone_layer = new Kinetic.Layer();
                    this.paths = [];
                    this.stones = [];
                    var that = this;
                    helpers.buildGrid(this, grid);
                    /*

                     */
                    // wait the images to be loaded
                    // and then add the layers to the stage
                    setTimeout(function () {
                        that.stage.add(that.path_layer);
                    }, 60);

                    setTimeout(function () {
                        that.stage.add(that.stone_layer);
                    }, 60);

                    setTimeout(function () {

                        that.stage.add(that.player_layer);
                    }, 60);

                    return this;
                }
            });
            Object.defineProperty(game, 'player_move', {

                value: function (direction) {
                    var canMove = helpers.isPossiblePlayerMove(direction, this.player, this.grid);
                    if(canMove){
                        switch(direction){
                            case 'right':
                                var newX = this.player.object.getX() + CONSTANTS.BOX_WIDTH;
                                this.player.object.setX(newX);
                                this.grid[this.player.row][this.player.column] = '=';
                                this.grid[this.player.row][this.player.column + 1] = 'p';
                                this.player.column += 1;
                                break;
                            case 'left':
                                var newX = this.player.object.getX() - CONSTANTS.BOX_WIDTH;
                                this.player.object.setX(newX);
                                this.grid[this.player.row][this.player.column] = '=';
                                this.grid[this.player.row][this.player.column - 1] = 'p';
                                this.player.column -= 1;
                                break;
                            case 'down':
                                var newY = this.player.object.getY() + CONSTANTS.BOX_HEIGHT;
                                this.player.object.setY(newY);
                                this.grid[this.player.row][this.player.column] = '=';
                                this.grid[this.player.row + 1][this.player.column] = 'p';
                                this.player.row += 1;
                                break;
                            case 'up':
                                var newY = this.player.object.getY() - CONSTANTS.BOX_HEIGHT;
                                this.player.object.setY(newY);
                                this.grid[this.player.row][this.player.column] = '=';
                                this.grid[this.player.row - 1][this.player.column] = 'p';
                                this.player.row -= 1;
                                break;
                        }
                        this.player_layer.draw();
                    }
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
    ['=', '=', '+', '+', '=', '+', '+', '=', '+']
];
window.onload = function () {
    var game = module.getGame(gameSet);
    window.onkeydown = function (ev) {
        if (ev.keyCode === 38) {
            game.player_move('up');
        }
        else if (ev.keyCode === 37) {
            game.player_move('left');
        } else if (ev.keyCode === 39) {
            game.player_move('right');
        } else if(ev.keyCode === 40){
            game.player_move('down');
        }
    };
};