var drawIntro = (function () {

    drawIntro = function (spriteSrc, frames, containerID) {

        var SCALE = 1.2,
            CONSTANTS = {
                "background": {
                    "INITIAL_X": 0,
                    "INITIAL_Y": 0,
                    "INITIAL_WIDTH": 800,
                    "INITIAL_HEIGHT": 560
                },
                "sun": {
                    "INITIAL_X": 450,
                    "INITIAL_Y": 20,
                    "INITIAL_WIDTH": 386 / (SCALE * 1.5),
                    "INITIAL_HEIGHT": 398 / (SCALE * 1.5)
                },
                "cloud": {
                    "INITIAL_X": 450,
                    "INITIAL_Y": -40,
                    "INITIAL_WIDTH": 585 / SCALE,
                    "INITIAL_HEIGHT": 326 / SCALE
                },
                "hand": {
                    "INITIAL_X": 480,
                    "INITIAL_Y": 395,
                    "INITIAL_WIDTH": 113 / SCALE,
                    "INITIAL_HEIGHT": 94 / SCALE
                },
                "head": {
                    "INITIAL_X": 230,
                    "INITIAL_Y": 210,
                    "INITIAL_WIDTH": 148 / SCALE,
                    "INITIAL_HEIGHT": 214 / SCALE
                },
                "torso": {
                    "INITIAL_X": 150,
                    "INITIAL_Y": 210,
                    "INITIAL_WIDTH": 494 / SCALE,
                    "INITIAL_HEIGHT": 335 / SCALE
                },
                "iceCubes": {
                    "INITIAL_X": 521,
                    "INITIAL_Y": 390,
                    "INITIAL_WIDTH": 34 / SCALE,
                    "INITIAL_HEIGHT": 92 / SCALE
                },
                "tears": {
                    "INITIAL_X": 182,
                    "INITIAL_Y": 222,
                    "INITIAL_WIDTH": 148 / SCALE,
                    "INITIAL_HEIGHT": 295 / SCALE
                },
                "heatEscape": {
                    "INITIAL_X": 70,
                    "INITIAL_Y": 370
                },
                "presents": {
                    "INITIAL_X": 50,
                    "INITIAL_Y": 370
                },

                "whyThat": {
                    "INITIAL_X": 90,
                    "INITIAL_Y": 350
                },
                HEAD_MAX_ROTATION_ANGLE: 1,
                HEAD_SHAKE_DURATION: 6000,
                SUN_INITIAL_MOVE_DURATION: 3000
            }, stage = new Kinetic.Stage({
                container: containerID,
                width: 800,
                height: 500
            }),
            direction = {
                left: {
                    x: -1,
                    y: 0
                },
                right: {
                    x: 1,
                    y: 0
                },
                up: {
                    x: 0,
                    y: -1
                },
                down: {
                    x: 0,
                    y: 1
                }
            },
            DIRECTIONS = {
                LEFT: 'left',
                RIGHT: 'right',
                UP: 'up',
                DOWN: 'down'
            },
            backgroundLayer = new Kinetic.Layer(),
            cloudLayer = new Kinetic.Layer(),
            sunLayer = new Kinetic.Layer(),
            russianLayer = new Kinetic.Layer(),
            frontLayer = new Kinetic.Layer(),
            introSprite = new Image(),
            cloud,
            sun,
            hand,
            head,
            background,
            iceCubes,
            torso,
            heatEscape,
            presents,
            tears,
            whyThat,
            sunZoomAndMoveDownAnimation = new Kinetic.Animation(sunZoomAndMoveDown, sunLayer),
            iseDropDownAnimation = new Kinetic.Animation(iceDropDown, russianLayer),
            opacityChange = 1;

        introSprite.src = spriteSrc;

        console.log('drawing');

        introSprite.onload = function () {

            initialiseFigures();
            initialDraw();
            initialHeadShake();

            setTimeout(fadeAndMoveCloudAnimation, 3000);

            setTimeout(function () {
                head.shakeHeadTimeout = false;
            }, CONSTANTS.HEAD_SHAKE_DURATION);

            setTimeout(function () {
                sun.initialSunMoveTimeout = false;
                sunZoomAndMoveDownAnimation.start();

                setTimeout(function () {
                    sunZoomAndMoveDownAnimation.stop();
                    iseDropDownAnimation.start();

                    setTimeout(function () {
                        iseDropDownAnimation.stop();
                        whyThatText();
                        addTears();
                        tearsFall();

                        setTimeout(function () {
                            fadeHand();

                            setTimeout(function () {
                                fadeTorso();

                                setTimeout(function () {
                                    fallHead();
                                    fadeBackground();

                                    setTimeout(function () {
                                        opacityChange = 1;
                                        presentsText();

                                        setTimeout(function () {
                                            opacityChange = 1;
                                            heatEscapeText();
                                            sunZoomAndMoveDownAnimation.start();
                                            setTimeout(function () {
                                                sunZoomAndMoveDownAnimation.stop();
                                            }, 7000)
                                        }, 5000)
                                    }, 3000)
                                }, 2000)
                            }, 1500)
                        }, 4500)
                    }, 2000)
                }, 2100)
            }, CONSTANTS.SUN_INITIAL_MOVE_DURATION);

            initialSunMoveDrawer();
        };

        function heatEscapeText() {
            var opacity = heatEscape.opacity();

            opacity += 0.01;
            heatEscape.opacity(opacity);
            frontLayer.draw();

            if (opacity < 6) {
                requestAnimationFrame(heatEscapeText);
            } else {
                heatEscape.remove();
                frontLayer.draw();
            }
        }

        function presentsText() {
            var opacity = presents.opacity();

            if (presents.opacity() > 1.5) {
                opacityChange *= -1;
            }

            opacity += 0.017 * opacityChange;
            presents.opacity(opacity);
            frontLayer.draw();

            if (opacity > 0) {
                requestAnimationFrame(presentsText);
            } else {
                presents.remove();
                frontLayer.draw();
            }
        }

        function fadeBackground() {
            var opacity = background.opacity();

            opacity -= 0.0018;
            background.opacity(opacity);
            backgroundLayer.draw();

            if (opacity > 0) {
                requestAnimationFrame(fadeBackground);
            } else {
                background.remove();
                backgroundLayer.draw();
            }

        }

        function fallHead() {
            var positionY = head.y() + 2;

            head.currentHeadAngle += 0.1 * head.headRotationDirection;
            head.rotate(head.currentHeadAngle);
            head.y(positionY);
            cloudLayer.draw();

            if (positionY < stage.height() + 100) {
                requestAnimationFrame(fallHead);
            } else {
                head.remove();
                cloudLayer.draw();
            }
        }

        function fadeTorso() {
            var opacity = torso.opacity();

            opacity -= 0.007;
            torso.opacity(opacity);
            russianLayer.draw();

            if (opacity > 0) {
                requestAnimationFrame(fadeTorso);
            } else {
                torso.remove();
                russianLayer.draw();
            }
        }

        function fadeHand() {
            var opacity = hand.opacity();

            opacity -= 0.01;
            hand.opacity(opacity);
            cloudLayer.draw();

            if (opacity > 0) {
                requestAnimationFrame(fadeHand);
            } else {
                hand.remove();
                cloudLayer.draw();
            }
        }

        function addTears() {
            frontLayer.add(tears);

        }

        function tearsFall() {
            var positionY = tears.y() + 2;

            tears.y(positionY);

            frontLayer.draw();

            if (positionY < stage.height() + 2) {
                requestAnimationFrame(tearsFall);
            } else {
                tears.remove();
                frontLayer.draw();
            }
        }

        function whyThatText() {
            var opacity = whyThat.opacity();

            if (whyThat.opacity() > 1.5) {
                opacityChange *= -1;
            }

            opacity += 0.01 * opacityChange;
            whyThat.opacity(opacity);
            frontLayer.draw();

            if (opacity > 0) {
                requestAnimationFrame(whyThatText);
            } else {
                whyThat.remove();
                frontLayer.draw();
            }
        }

        function iceDropDown() {
            var positionY = iceCubes.y() + 1;
            iceCubes.y(positionY);

            frontLayer.draw();

            if (positionY < stage.height() + 2) {
                requestAnimationFrame(tearsFall);
            } else {
                iceCubes.remove();
                frontLayer.draw();
            }
        }

        function sunZoomAndMoveDown(frame) {
            var scale = 1 + frame.time * 0.0006,
                positionX = sun.x() - 1;

            sun.x(positionX);
            sun.scale({x: scale, y: scale});
        }

        function initialSunMoveDrawer() {

            var distance = 10,
                minX = CONSTANTS.sun.INITIAL_X - distance,
                maxX = CONSTANTS.sun.INITIAL_X + distance,
                minY = CONSTANTS.sun.INITIAL_Y - distance,
                maxY = CONSTANTS.sun.INITIAL_Y + distance;


            if (sun.x() < minX && sun.sunDirection === DIRECTIONS.LEFT) {
                sun.sunDirection = DIRECTIONS.UP;
            }
            if (sun.y() < minY && sun.sunDirection === DIRECTIONS.UP) {
                sun.sunDirection = DIRECTIONS.RIGHT;
            }
            if (sun.x() > maxX && sun.sunDirection === DIRECTIONS.RIGHT) {
                sun.sunDirection = DIRECTIONS.DOWN;
            }
            if (sun.y() > maxY && sun.sunDirection === DIRECTIONS.DOWN) {
                sun.sunDirection = DIRECTIONS.LEFT;
            }

            sun.x(sun.x() + 3 * direction[sun.sunDirection].x);
            sun.y(sun.y() + 3 * direction[sun.sunDirection].y);

            sunLayer.draw();

            if (sun.initialSunMoveTimeout) {
                requestAnimationFrame(initialSunMoveDrawer);
            }
        }

        function initialHeadShake() {
            head.currentHeadAngle += 0.1 * head.headRotationDirection;

            head.rotate(head.currentHeadAngle);

            if (head.currentHeadAngle < -CONSTANTS.HEAD_MAX_ROTATION_ANGLE ||
                head.currentHeadAngle > CONSTANTS.HEAD_MAX_ROTATION_ANGLE) {
                head.headRotationDirection *= -1;
            }

            cloudLayer.draw();

            if (head.shakeHeadTimeout) {
                requestAnimationFrame(initialHeadShake);
            }
        }

        function fadeAndMoveCloudAnimation() {
            var x = cloud.x() + 2,
                y = cloud.y() - 1,
                opacity = cloud.opacity() - 0.001;

            cloud.opacity(opacity);

            cloud.x(x);
            cloud.y(y);

            cloudLayer.draw();

            if (cloud.x < stage.width + 10) {
                requestAnimationFrame(fadeAndMoveCloudAnimation);
            }
        }

        function initialDraw() {
            backgroundLayer.add(background);

            sunLayer.add(sun);

            cloud.rotate(30);

            cloudLayer.add(cloud);
            cloudLayer.add(head);
            cloudLayer.add(hand);

            torso.rotate(20);
            russianLayer.add(torso);
            russianLayer.add(iceCubes);


            frontLayer.add(presents);
            frontLayer.add(heatEscape);
            frontLayer.add(whyThat);
            //frontLayer.add(tears);

            stage.add(backgroundLayer);
            stage.add(sunLayer);
            stage.add(cloudLayer);
            stage.add(russianLayer);
            stage.add(frontLayer);
        }

        function initialiseFigures() {

            // BACKGROUND ITEMS
            // background
            background = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.background.INITIAL_X, // position x on the canvas
                y: CONSTANTS.background.INITIAL_Y, // position y on the canvas
                width: CONSTANTS.background.INITIAL_WIDTH,//frames.cloud.frame.w, // desired width to appear in the canvas
                height: CONSTANTS.background.INITIAL_HEIGHT, //frames.cloud.frame.h, // desired height to appear in the canvas
                crop: {
                    x: frames.background.x, // position x from the sprite
                    y: frames.background.y, // position y from the sprite
                    width: frames.background.w, // width from the sprite
                    height: frames.background.h // height y from the sprite
                }
            });

            // SUN LAYER
            // sun
            sun = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.sun.INITIAL_X,
                y: CONSTANTS.sun.INITIAL_Y,
                width: CONSTANTS.sun.INITIAL_WIDTH,
                height: CONSTANTS.sun.INITIAL_HEIGHT,
                crop: {
                    x: frames.sun.x,
                    y: frames.sun.y,
                    width: frames.sun.w,
                    height: frames.sun.h
                }
            });
            sun.initialSunMoveTimeout = true;
            sun.sunDirection = 'left';


            // CLOUD LAYER
            // cloud
            cloud = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.cloud.INITIAL_X,
                y: CONSTANTS.cloud.INITIAL_Y,
                width: CONSTANTS.cloud.INITIAL_WIDTH,
                height: CONSTANTS.cloud.INITIAL_HEIGHT,
                crop: {
                    x: frames.cloud.x,
                    y: frames.cloud.y,
                    width: frames.cloud.w,
                    height: frames.cloud.h
                }
            });

            // head
            head = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.head.INITIAL_X,
                y: CONSTANTS.head.INITIAL_Y,
                width: CONSTANTS.head.INITIAL_WIDTH,
                height: CONSTANTS.head.INITIAL_HEIGHT,
                crop: {
                    x: frames.head.x,
                    y: frames.head.y,
                    width: frames.head.w,
                    height: frames.head.h
                },
                offset: {
                    x: CONSTANTS.head.INITIAL_WIDTH / 2,
                    y: CONSTANTS.head.INITIAL_HEIGHT / 2
                }
            });
            head.headRotationDirection = 1;
            head.currentHeadAngle = 0;
            head.shakeHeadTimeout = true;

            // hand
            hand = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.hand.INITIAL_X,
                y: CONSTANTS.hand.INITIAL_Y,
                width: CONSTANTS.hand.INITIAL_WIDTH,
                height: CONSTANTS.hand.INITIAL_HEIGHT,
                crop: {
                    x: frames.hand.x,
                    y: frames.hand.y,
                    width: frames.hand.w,
                    height: frames.hand.h
                }
            });


            // RUSSIAN LAYER
            // torso
            torso = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.torso.INITIAL_X,
                y: CONSTANTS.torso.INITIAL_Y,
                width: CONSTANTS.torso.INITIAL_WIDTH,
                height: CONSTANTS.torso.INITIAL_HEIGHT,
                crop: {
                    x: frames.torso.x,
                    y: frames.torso.y,
                    width: frames.torso.w,
                    height: frames.torso.h
                }
            });

            // iceCubes
            iceCubes = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.iceCubes.INITIAL_X,
                y: CONSTANTS.iceCubes.INITIAL_Y,
                width: CONSTANTS.iceCubes.INITIAL_WIDTH,
                height: CONSTANTS.iceCubes.INITIAL_HEIGHT,
                crop: {
                    x: frames.iceCubes.x,
                    y: frames.iceCubes.y,
                    width: frames.iceCubes.w,
                    height: frames.iceCubes.h
                }
            });

            // FRONT LAYER
            // tears
            tears = new Kinetic.Image({
                image: introSprite,
                x: CONSTANTS.tears.INITIAL_X,
                y: CONSTANTS.tears.INITIAL_Y,
                width: CONSTANTS.tears.INITIAL_WIDTH,
                height: CONSTANTS.tears.INITIAL_HEIGHT,
                crop: {
                    x: frames.tears.x,
                    y: frames.tears.y,
                    width: frames.tears.w,
                    height: frames.tears.h
                }
            });

            // heatEscape
            heatEscape = new Kinetic.Text({
                x: CONSTANTS.heatEscape.INITIAL_X,
                y: CONSTANTS.heatEscape.INITIAL_Y,
                text: 'HEAT ESCAPE',
                fontSize: 70,
                fontFamily: 'iceCream',
                fill: 'black',
                opacity: 0
            });

            // presents
            presents = new Kinetic.Text({
                x: CONSTANTS.presents.INITIAL_X,
                y: CONSTANTS.presents.INITIAL_Y,
                text: 'BLACK RUSSIAN PRESENTS',
                fontSize: 50,
                fontFamily: 'iceCream',
                fill: 'black',
                opacity: 0
            });

            // whyThat
            whyThat = new Kinetic.Text({
                x: CONSTANTS.whyThat.INITIAL_X,
                y: CONSTANTS.whyThat.INITIAL_Y,
                text: '100 TEI PRAJI6 DEIBA',
                fontSize: 45,
                fontFamily: 'iceCream',
                fill: 'white',
                opacity: 0
            });
        }
    };

    return drawIntro;
}());
