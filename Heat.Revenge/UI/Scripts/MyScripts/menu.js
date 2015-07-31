var menu = (function () {
    var CONSTANTS = {
        MENU_WIDTH:800,
        MENU_HEIGHT:500
    };

    (function activateTimeOut() {
        setTimeout(function () {
            stopAnimation();

            $("#startScreen").toggleClass('hidden');
        }, 3000);
    }());


    (function initScreen() {
        $("#startScreen").css('width', CONSTANTS.MENU_WIDTH);
        $("#startScreen").css('height', CONSTANTS.MENU_HEIGHT);

        $("#howToPlayScreen").css('width', CONSTANTS.MENU_WIDTH);
        $("#howToPlayScreen").css('height', CONSTANTS.MENU_HEIGHT);

        $("#endScreen").css('width', CONSTANTS.MENU_WIDTH);
        $("#endScreen").css('height', CONSTANTS.MENU_HEIGHT);

        $("#aboutScreen").css('width', CONSTANTS.MENU_WIDTH);
        $("#aboutScreen").css('height', CONSTANTS.MENU_HEIGHT);
    })();

    function stopAnimation() {
        $("#canvasContainer").attr('hidden', 'hidden');

    }

    function showGame() {
        showStartScreen();
        startGame();
    }

    function showStartScreen() {
        $("#startScreen").toggleClass('hidden');
    }

    function showHelp() {
        $("#startScreen").toggleClass('hidden');
        $("#howToPlayScreen").toggleClass('hidden');
    }

    function showAbout() {
        //$("#startScreen").toggleClass('hidden');
       window.location.href
        //$("#aboutScreen").toggleClass('hidden');
    }

    function showFinalScreen() {
        $("#endScreen").toggleClass('hidden');
        $("#svg-container").toggleClass('hidden');
        $("#kinetic-canvas").toggleClass('hidden');
    }

    function goBackFromAbout() {
        $("#aboutScreen").toggleClass('hidden');
        $("#startScreen").toggleClass('hidden');
    }

    function goBackFromHowToPlay() {
        $("#howToPlayScreen").toggleClass('hidden');
        $("#startScreen").toggleClass('hidden');
    }

    function getHighScore(highScore) {
        points = highScore;
        $('#lbl_score').append(points);
    }

    function sendHighScoreToDB() {
        $.ajax({
            type: "POST",
            url: "Default.aspx/SaveHighScore",
            data: '{owner: "' + $("#input_user").val() + '", points: "' + points + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }

    return {
        showGame: showGame,
        showHelp: showHelp,
        showAbout: showAbout,
        goBackFromAbout: goBackFromAbout,
        goBackFromHowToPlay: goBackFromHowToPlay,
        sendHighScoreToDB: sendHighScoreToDB,
        getHighScore: getHighScore,
        showFinalScreen:showFinalScreen
    }

}());

//start screen buttons
$('#btn_start').on('click',menu.showGame);
$('#btn_howToPlay').on('click',menu.showHelp);
$('#btn_about').on('click', menu.showAbout);

//back buttons
$('#btn_backFromAbout').on('click',menu.goBackFromAbout);
$('#btn_backFromHowToPlay').on('click',menu.goBackFromHowToPlay);

//end screen buttons
$('#btn_submit').on('click', menu.sendHighScoreToDB);



