(function () {
    var bodyElement = document.getElementsByTagName('body')[0],
	    canvasContainer = document.getElementById('canvasContainer'),
        introCanvasDiv = document.createElement('div'),
        CONSTANTS = {
            INTRO_CANVAS_WIDTH: '800',
            INTRO_CANVAS_HEIGHT: '500',
            INTRO_SPRITE_LOCATION: 'media/BlackRussianIntroSprite.png',
            INTRO_ANIMATION_DIV_ID: 'intro-animation-div'
        };

    function initIntroCanvas() {
        introCanvasDiv.setAttribute('id', CONSTANTS.INTRO_ANIMATION_DIV_ID);
        introCanvasDiv.setAttribute('width', CONSTANTS.INTRO_CANVAS_WIDTH);
        introCanvasDiv.setAttribute('height', CONSTANTS.INTRO_CANVAS_HEIGHT);
    }

    function initWrapperDiv() {
        canvasContainer.appendChild(introCanvasDiv);
    }
    
    initIntroCanvas();
    initWrapperDiv();

    bodyElement.onload = drawIntro(CONSTANTS.INTRO_SPRITE_LOCATION, introSpriteCoordinates, CONSTANTS.INTRO_ANIMATION_DIV_ID);
}());


