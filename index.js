var tiles = ["red", "green", "blue", "yellow"];
var gameSequence = [];
var userChoosenPattern = [];
level = 0;
started = false;
$(document).keydown(function(){
    if(started === false){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".tiles").on("click", function(){
    var userChoice = this.id;
    $("#" + userChoice).addClass("pressed");
    setTimeout(function(){
        $("#" + userChoice).removeClass("pressed");
    }, 100);
    playSound(userChoice);
    userChoosenPattern.push(userChoice);
    checkPattern(userChoosenPattern.length - 1);
});

function randomNumber(){
    return Math.floor(Math.random() * 4);
};

function nextSequence(){
    userChoosenPattern = [];
    level += 1;
    $("h1").text("Level " + level);
    var randomTile = tiles[randomNumber()];
    $("." + randomTile).fadeOut(100).fadeIn(100);
    playSound(randomTile);
    gameSequence.push(randomTile);
};

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};

function checkPattern(index){
    if(gameSequence[index] === userChoosenPattern[index]){
        if(gameSequence.length === userChoosenPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        };
    }
    else{
        $("body").css("background-color", "red");
        setTimeout(function(){
            $("body").css("background-color", "#011f3f");
        }, 200);
        $("h1").text("Game Over, Press any key to restart!");
        $("body").on("keydown", function(){
            restart();
        });
    };
};

function restart(){
    level = 0;
    gameSequence = [];
    started = false;
};
