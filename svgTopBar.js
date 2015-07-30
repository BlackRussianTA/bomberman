var topBarSVG = (function () {
    var CONSTANTS = {
            TOP_BAR_TO_GAME_RATIO: 0.1,
            TOP_BAR_MARGINS: 0.0,
            ICE_VS_FIRE_BAR_WIDTH_RATIO: 0.4,
            ICE_VS_FIRE_BAR_HEIGHT_RATIO: 0.4,
            BORDER_RADIUS: 8,
            PLAYER_ALIVE_IMAGE_PATH: 'media/player.png',
            PLAYER_DEAD_IMAGE_PATH: 'media/playerDead.png',
            ICE_CUBE_IMAGE_PATH: 'media/ice.png'
        },
        topBarSVG = Object.create({});

    function initialiseSVGPaper(containerID, width, height) {
        return Raphael(containerID, width, height);
    }

    function calculatePercentageRatio(currentPoints, maxPoints) {
        var singlePart = 1 / maxPoints,
            currentPointsParts = currentPoints * singlePart,
            restParts = 1 - currentPointsParts;

        return {
            currentPointsParts: currentPointsParts,
            restParts: restParts
        }
    }

    function initialDrawBackGround(paper, dimensions) {
        return paper.rect(
            dimensions.margin,
            dimensions.margin,
            dimensions.topBarBackgroundWidth,
            dimensions.topBarHeight, CONSTANTS.BORDER_RADIUS)
            .attr({
                fill: 'black',
                stroke: 'none',
                opacity: 0
            }).animate({
                opacity: 0.2
            }, 1000);
    }

    function calculatePartWidth(persantage, dimentions) {
        return persantage * dimentions.iceVsFireBarWidth;
    }

    function calculateFireBarX(persentage, dimentions) {

        return dimentions.iceVsFireBarX + (dimentions.iceVsFireBarWidth * (1 - persentage));
    }

    function initialDrawIceVsFireBar(paper, dimensions) {
        var icePointsBar,
            firePointsBar,
            percentageSymbol,
            initialWidth = dimensions.iceVsFireBarWidth / 2,
            initialHeight = dimensions.iceVsFireBarHeight,
            icePointsX = dimensions.iceVsFireBarX,
            icePointsY = dimensions.margin + dimensions.padding,
            firePointsX = icePointsX + (dimensions.iceVsFireBarWidth),
            firePointsY = icePointsY,
            percentageX = icePointsX + initialWidth,
            percentageY = icePointsY + (initialHeight / 2);

        icePointsBar = paper.rect(icePointsX, icePointsY, 0, initialHeight, CONSTANTS.BORDER_RADIUS)
            .attr({
                fill: 'white',
                stroke: 'none',
                opacity: 0.0
            })
            .animate({
                width: initialWidth,
                opacity: 0.7
            }, 1200);

        firePointsBar = paper.rect(firePointsX, firePointsY, 0, initialHeight, CONSTANTS.BORDER_RADIUS)
            .attr({
                fill: 'gray',
                stroke: 'none',
                opacity: 0
            })
            .animate({
                width: initialWidth,
                x: icePointsX + initialWidth,
                opacity: 0.7
            }, 1200);

        // TODO: calculate font size automatically
        percentageSymbol = paper.text(percentageX, percentageY, '%').attr({
            fill: 'black',
            stroke: 'none',
            opacity: 0,
            font: '40px iceCream'
        });
        setTimeout(function () {
            percentageSymbol.animate({
                    opacity: 0.8
                }, 1000
            );
        }, 1200);

        return {
            icePointsBar: icePointsBar,
            firePointsBar: firePointsBar,
            percentageSymbol: percentageSymbol
        }
    }

    function initialiseIceVsFirePercentageFields(paper, dimensions) {
        var icePointsRect,
            firePointsRect,
            icePointsText,
            firePointsText,
            initialHeightAndWidth = dimensions.iceVsFireBarHeight,
            icePointsX = dimensions.topBarWidth - dimensions.margin - (3 * dimensions.padding) - dimensions.iceVsFireBarWidth - (2 * initialHeightAndWidth),
            icePointsY = dimensions.margin + dimensions.padding,
            firePointsX = dimensions.topBarWidth - dimensions.margin - dimensions.padding - initialHeightAndWidth,
            firePointsY = icePointsY,
            iceTextX = icePointsX + (initialHeightAndWidth / 2),
            iceTextY = icePointsY + (initialHeightAndWidth / 2),
            fireTextX = firePointsX + (initialHeightAndWidth / 2),
            fireTextY = iceTextY;

        icePointsRect = paper.rect(icePointsX, icePointsY, initialHeightAndWidth, initialHeightAndWidth, CONSTANTS.BORDER_RADIUS)
            .attr({
                fill: 'white',
                stroke: 'none',
                opacity: 0.0
            })
            .animate({
                opacity: 0.7
            }, 1200);

        firePointsRect = paper.rect(firePointsX, firePointsY, initialHeightAndWidth, initialHeightAndWidth, CONSTANTS.BORDER_RADIUS)
            .attr({
                fill: 'gray',
                stroke: 'none',
                opacity: 0
            })
            .animate({
                width: initialHeightAndWidth,
                opacity: 0.7
            }, 1200);

        // TODO: calculate font size automatically
        icePointsText = paper.text(iceTextX, iceTextY, '50')
            .attr({
                fill: 'black',
                stroke: 'none',
                opacity: 0,
                font: 'bold 15px iceCream'
            });
        setTimeout(function () {
            icePointsText.animate({
                    opacity: 1
                }, 1000
            );
        }, 1200);

        // TODO: calculate font size automatically
        firePointsText = paper.text(fireTextX, fireTextY, '50')
            .attr({
                fill: 'white',
                stroke: 'none',
                opacity: 0,
                font: 'bold 15px iceCream'
            });
        setTimeout(function () {
            firePointsText.animate({
                    opacity: 1
                }, 1000
            );
        }, 1200);

        // TODO: return object!!!

        return {
            icePointsRect: icePointsRect,
            firePointsRect: firePointsRect,
            icePointsText: icePointsText,
            firePointsText: firePointsText
        }
    }

    function initialiseIceCubesCollected(paper, dimensions) {
        var iceCubeImage,
            iceCubeCountText,
            initialHeightAndWidth = dimensions.iceVsFireBarHeight,
            iceCubeImageX = dimensions.margin + (5 * dimensions.padding) + (2 * initialHeightAndWidth),
            iceCubeImageY = dimensions.margin + dimensions.padding,
            iceCubeCountTextX = iceCubeImageX + dimensions.padding + initialHeightAndWidth,
            iceCubeCountTextY = iceCubeImageY + (initialHeightAndWidth / 2);

        iceCubeImage = paper.image(CONSTANTS.ICE_CUBE_IMAGE_PATH, iceCubeImageX, iceCubeImageY, initialHeightAndWidth, initialHeightAndWidth)
            .attr({
                opacity: 0
            });

        // TODO: calculate font size automatically
        iceCubeCountText = paper.text(iceCubeCountTextX, iceCubeCountTextY, 'x 0')
            .attr({
                fill: 'black',
                stroke: 'none',
                opacity: 0,
                font: 'bold 30px iceCream',
                'text-anchor': 'start'
            });

        setTimeout(function () {
            iceCubeImage.animate({
                opacity: 0.8
            }, 1000);

            iceCubeCountText.animate({
                    opacity: 0.9
                }, 1000
            );
        }, 2400);

        return {
            iceCubeImage: iceCubeImage,
            iceCubeCountText: iceCubeCountText
        }
    }

    function initialisePlayerLives(paper, dimensions, initialLives) {
        var playerImage,
            playerLivesCountText,
            initialHeightAndWidth = dimensions.iceVsFireBarHeight,
            playerImageX = dimensions.margin + dimensions.padding,
            playerImageY = dimensions.margin + dimensions.padding,
            playerLivesCountTextX = playerImageX + initialHeightAndWidth + dimensions.padding,
            playerLivesCountTextY = playerImageY + (initialHeightAndWidth / 2),
            initialLives = initialLives || 3;

        playerImage = paper.image(CONSTANTS.PLAYER_ALIVE_IMAGE_PATH, playerImageX, playerImageY, initialHeightAndWidth, initialHeightAndWidth)
            .attr({
                opacity: 0
            });

        // TODO: calculate font size automatically and Lives count
        playerLivesCountText = paper.text(playerLivesCountTextX, playerLivesCountTextY, 'x ' + initialLives)
            .attr({
                fill: 'black',
                stroke: 'none',
                opacity: 0,
                font: 'bold 30px iceCream',
                'text-anchor': 'start'
            });

        setTimeout(function () {
            playerImage.animate({
                opacity: 0.8
            }, 1000);

            playerLivesCountText.animate({
                    opacity: 0.9
                }, 1000
            );
        }, 2400);

        return {
            playerImage: playerImage,
            playerLivesCountText: playerLivesCountText
        }
    }

    function calculateTopBarDimensions(canvasWidth, canvasHeight) {
        var margin = canvasWidth * CONSTANTS.TOP_BAR_MARGINS,
            topBarWidth = canvasWidth,
            topBarHeight = canvasHeight * CONSTANTS.TOP_BAR_TO_GAME_RATIO,
            topBarBackgroundWidth = canvasWidth - (2 * margin),
            iceVsFireBarWidth = topBarWidth * CONSTANTS.ICE_VS_FIRE_BAR_WIDTH_RATIO,
            padding = (topBarHeight * CONSTANTS.ICE_VS_FIRE_BAR_HEIGHT_RATIO) / 2,
            iceVsFireBarHeight = topBarHeight - (2 * padding),
            iceVsFireBarX = topBarWidth -  margin + padding - iceVsFireBarWidth - (2 * iceVsFireBarHeight),
            paperHeight = topBarHeight + (2 * margin);

        return {
            margin: margin,
            padding: padding,
            topBarWidth: topBarWidth,
            topBarHeight: topBarHeight,
            topBarBackgroundWidth: topBarBackgroundWidth,
            iceVsFireBarWidth: iceVsFireBarWidth,
            iceVsFireBarHeight: iceVsFireBarHeight,
            iceVsFireBarX: iceVsFireBarX,
            paperHeight: paperHeight
        }
    }

    Object.defineProperty(topBarSVG, 'init', {
        value: function (containerID, canvasWidth, canvasHeight, timeON) {
            var self = this;
            self._dimensions = calculateTopBarDimensions(canvasWidth, canvasHeight);
            self._paper = initialiseSVGPaper(containerID, canvasWidth, self._dimensions.paperHeight);
            self._background = initialDrawBackGround(self._paper, self._dimensions);
            setTimeout(function () {
                self._iceAndFireRatioBars = initialDrawIceVsFireBar(self._paper, self._dimensions);
            }, 1000);
            setTimeout(function () {
                self._iceAndFIreRectsAndPercentage = initialiseIceVsFirePercentageFields(self._paper, self._dimensions);
            }, 2000);

            self._iceCubesCollected = initialiseIceCubesCollected(self._paper, self._dimensions);
            self._livesCount = initialisePlayerLives(self._paper, self._dimensions);

            return this;
        }
    });

    Object.defineProperty(topBarSVG, 'updateIce', {
        value: function (newCount) {
            this._iceCubesCollected.iceCubeCountText.attr({
                text: 'x ' + newCount
            })
        }
    });

    Object.defineProperty(topBarSVG, 'updateLives', {
        value: function (newCount) {
            this._livesCount.playerLivesCountText.attr({
                text: 'x ' + newCount
            });

            // TODO: correct the image srs
            if (newCount <= 0) {
                this._livesCount.playerImage.attr({
                    src: CONSTANTS.PLAYER_DEAD_IMAGE_PATH
                });
            }
        }
    });

    Object.defineProperty(topBarSVG, 'updateRatioBars', {
        value: function (iceCount, fireCount) {
            var self = this,
                ratio = calculatePercentageRatio(iceCount, fireCount),
                currentPointsParts = ratio.currentPointsParts,
                restParts = ratio.restParts,
                icePartWidth = calculatePartWidth(currentPointsParts, self._dimensions),
                firePartWidth = calculatePartWidth(restParts, self._dimensions);

            self._iceAndFireRatioBars.icePointsBar.animate({
                width: icePartWidth
            }, 1000);

            self._iceAndFireRatioBars.percentageSymbol.animate({
                x: icePartWidth + self._dimensions.iceVsFireBarX
            }, 1000);

            self._iceAndFireRatioBars.firePointsBar.animate({
                x: calculateFireBarX(restParts, self._dimensions),
                width: firePartWidth
            }, 1000);

            self._iceAndFIreRectsAndPercentage.icePointsText.attr({
                text: Math.round(currentPointsParts * 100)
            });

            self._iceAndFIreRectsAndPercentage.firePointsText.attr({
                text: Math.round(restParts * 100)
            });
        }
    });

    return topBarSVG;
}());

//// Some tests
//var smthing = Object.create(topBarSVG);
//
//smthing.init('svg-container', 800, 500);
//
//setTimeout(function () {
//    smthing.updateIce(20)
//}, 5000);
//
//setTimeout(function () {
//    smthing.updateLives(0)
//}, 5000);
//
//setTimeout(function () {
//    smthing.updateRatioBars(30, 60)
//}, 5000);
//
//setTimeout(function () {
//    smthing.updateRatioBars(102, 33)
//}, 5333);
//setTimeout(function () {
//    smthing.updateRatioBars(1, 33)
//}, 7000);
//setTimeout(function () {
//    smthing.updateRatioBars(155502, 1111)
//}, 9600);