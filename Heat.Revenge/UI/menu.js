var points;
var user;

(function myFunction() {
    setTimeout(function () {
        stopAnimation();

        $("#startScreen").toggleClass('hidden');
    }, 1000);
}());


(function initScreen() {
    $("#startScreen").css('width', '800px');
    $("#startScreen").css('height', '500px');

    $("#howToPlayScreen").css('width', '800px');
    $("#howToPlayScreen").css('height', '500px');

    $("#endScreen").css('width', '800px');
    $("#endScreen").css('height', '500px');

    $("#aboutScreen").css('width', '800px');
    $("#aboutScreen").css('height', '500px');
})();

function stopAnimation() {
    $("#canvasContainer").attr('hidden','hidden');

}

function showGame() {
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

//start screen buttons
$('#btn_start').on('click',showGame);
$('#btn_howToPlay').on('click',showHelp);
$('#btn_about').on('click',showAbout);

//back buttons
$('#btn_backFromAbout').on('click',goBackFromAbout);
$('#btn_backFromHowToPlay').on('click',goBackFromHowToPlay);

//end screen buttons
$('#btn_submit').on('click', sendHighScoreToDB);



