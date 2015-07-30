window.onload = function () {
    function game() {
        var constants = {
            BACKGROUND_IMAGE: 'images/Backgrounds/colored_grass.png',
            PLAYER_IMAGE: 'images/Players/spritesheet_players.png',
            BACKGROUND_INITIAL_OFFSET_X: 10,
            BACKGROUND_INITIAL_OFFSET_Y: 250,
            PLAYER_MOVE_SPEED: 5
        };

        function setBackgroundLayer(stage) {
            var layer = new Kinetic.Layer();

            var imageObj = new Image();
            imageObj.src = constants.BACKGROUND_IMAGE;
            var background = new Kinetic.Image({
                x: 0,
                y: 0,
                fillPatternImage: imageObj,
                width: stage.width(),
                height: stage.height(),
                fillPatternRepeat: "repeat-x",
                fillPatternOffsetX: constants.BACKGROUND_INITIAL_OFFSET_X,
                fillPatternOffsetY: constants.BACKGROUND_INITIAL_OFFSET_Y
            });
            imageObj.onload = function () {
                layer.add(background);
                stage.add(layer);
            };
            return [layer, background];
        }

        function setPlayerLayer(stage) {
            var layer = new Kinetic.Layer();

            var imageObj = new Image();

            imageObj.src = constants.PLAYER_IMAGE;
            var player = new Kinetic.Sprite({
                x: stage.getWidth() /2.3 ,
                y: stage.height() /3.4 ,
                image: imageObj,
                animation: 'idle',
                animations: {
                    idle: [
                        768, 0, 128, 256
                    ],
                    walk: [
                        640, 1280, 128, 256,
                        640, 1024, 128, 256

                    ],
                    jump:[
                        768, 256, 128, 256
                    ]

                },
                frameRate: 7,
                frameIndex: 0
            });
            imageObj.onload = function () {

                layer.add(player);
                stage.add(layer);
                player.start();
                var frameCount = 0;
                player.on('frameIndexChange', function (evt) {
                    if (player.animation() === 'walk' && ++frameCount > 3) {
                        player.animation('idle');
                        frameCount = 0;
                    }
                });
            };
            return [layer, player];
        }

        var background = (function () {
            background = {
                init: function (stage) {
                    res = setBackgroundLayer(stage);
                    this.layer = res[0];
                    this.object = res[1];
                    this.jumpStatus = false;
                    return this;
                },
                jump: function (player) {
                    if (this.jumpStatus == false) {
                        player.object.animation('jump');
                        var x = this.object.fillPatternOffsetX(),
                            y = this.object.fillPatternOffsetY(),
                            originalPostion = {
                                x: x,
                                y: y
                            },
                            CONSTS = {
                                JUMP_HEIGHT: 150
                            },
                            updatex = player.object.scale().x*1,
                            updatey = -5;
                        this.jumpStatus = true;
                        var elem = this;

                        function performJump() {
                            if (originalPostion.y - CONSTS.JUMP_HEIGHT > elem.object.fillPatternOffsetY()) {
                                updatey *= -1;
                            }
                            elem.object.fillPatternOffsetX(elem.object.fillPatternOffsetX() + updatex);
                            elem.object.fillPatternOffsetY(elem.object.fillPatternOffsetY() + updatey);
                            elem.layer.draw();
                            if (originalPostion.y > elem.object.fillPatternOffsetY()) {
                                requestAnimationFrame(performJump);
                            } else {
                                elem.jumpStatus = false;
                                player.object.animation('idle');
                            }
                        }

                        performJump();
                    }
                },
                move: function (x) {
                    this.object.fillPatternOffsetX(this.object.fillPatternOffsetX() + x);
                    this.layer.draw();
                }
            };
            return background
        }());

        var player = (function () {
            player = {
                init: function (stage) {
                    res = setPlayerLayer(stage);
                    this.layer = res[0];
                    this.object = res[1];
                    return this;
                },
                jump: function (background) {
                    background.jump(this);
                },
                move: function (background, direction) {
                    if(this.object.scale().x !== direction){
                        this.object.stop();
                        this.object.setX(this.object.getX() -  direction *128);
                        this.layer.draw();

                        this.object.scale({x:direction,y:1});
                        this.object.start();
                    }
                    if (this.object.animation() != 'walk') {
                        this.object.animation('walk')
                    }
                    background.move(direction * constants.PLAYER_MOVE_SPEED)
                }
            };
            return player
        }());
        var stage = (function () {
            stage = {
                init: function (id, width, height) {
                    var stage = new Kinetic.Stage({
                        container: id,
                        width: width,
                        height: height
                    });
                    return stage;
                }
            };
            return stage
        }());
        var game = (function () {
            game = {
                init: function (stage, background, player) {
                    this.stage = stage;
                    this.background = background;
                    this.player = player;
                    return this;
                },
                playerJump: function () {
                    this.player.jump(this.background);
                },
                playerMoveLeft: function () {
                    this.player.move(this.background, -1)
                },
                playerMoveRight: function () {

                    this.player.move(this.background, 1);
                }
            };
            return game
        }());

        var module = {
            getStage: function (id, width, height) {
                return Object.create(stage).init(id, width, height);
            },
            getBackground: function (stage) {
                return Object.create(background).init(stage);
            },
            getPlayer: function (stage) {
                return Object.create(player).init(stage);
            },
            getGame: function (stage, background, player) {
                return Object.create(game).init(stage, background, player);
            }
        };
        return module;
    };

    var module = game();
    var stage = module.getStage('kinetic-canvas', 800, 600);
    var background = module.getBackground(stage);
    var player;
    var game;
    setTimeout(function () {
        player = module.getPlayer(stage);

        game = module.getGame(stage, background, player);
    }, 60);
    window.onkeydown = function (ev) {
        if (ev.keyCode === 32) {
            game.playerJump();
        }
        else if (ev.keyCode === 37) {
            game.playerMoveLeft();
        } else if (ev.keyCode === 39) {
            game.playerMoveRight();
        }
    };
};