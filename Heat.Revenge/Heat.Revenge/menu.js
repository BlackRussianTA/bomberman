(function initScreen(){
    $("#startScreen").toggleClass('hidden');

    $("#startScreen").css('width',9*72+'px');
    $("#startScreen").css('height',7*72+'px');

    $("#howToPlayScreen").css('width',9*72+'px');
    $("#howToPlayScreen").css('height',7*72+'px');

    $("#endScreen").css('width',9*72+'px');
    $("#endScreen").css('height',7*72+'px');

    $("#aboutScreen").css('width',9*72+'px');
    $("#aboutScreen").css('height',7*72+'px');
})();

function showGame(){
    showStartScreen();
    startGame();
}

function showStartScreen(){
    $("#startScreen").toggleClass('hidden');
}

function showHelp(){
    $("#startScreen").toggleClass('hidden');
    $("#howToPlayScreen").toggleClass('hidden');
}

function showAbout(){
    $("#startScreen").toggleClass('hidden');
    $("#aboutScreen").toggleClass('hidden');
}

function showFinalScreen(){
    $("#endScreen").toggleClass('hidden');
    $("#svg-container").toggleClass('hidden');
    $("#kinetic-canvas").toggleClass('hidden');
}

function goBackFromAbout(){
    $("#aboutScreen").toggleClass('hidden');
    $("#startScreen").toggleClass('hidden');
}

function goBackFromHowToPlay(){
    $("#howToPlayScreen").toggleClass('hidden');
    $("#startScreen").toggleClass('hidden');
}

function sendHighScoreToDB(){

}

//start screen buttons
$('#btn_start').on('click',showGame);
$('#btn_howToPlay').on('click',showHelp);
$('#btn_about').on('click',showAbout);

//back buttons
$('#btn_backFromAbout').on('click',goBackFromAbout);
$('#btn_backFromHowToPlay').on('click',goBackFromHowToPlay);

//end screen buttons
$('#btn_submit').on('click',sendHighScoreToDB);


