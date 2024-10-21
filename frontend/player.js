const K = 32.0;
const denominator = 400.0;
let defaultScore = 1200.0;
const hyperlink = "http://127.0.0.1:3000"



//After updating, score can be a weird number so this makes it easier to display without changing the exact value
var scoreToDisplay = function(score){
    score*=100;
    return (Math.round(score)/100);
}
    

//Uses the algorithm from the Elo system to determine an expected score (probability) of winning
//More info at https://en.wikipedia.org/wiki/Elo_rating_system#Mathematical_details
var getExpectedScore = function(myScore, opponentScore){
    var tempExponent = (opponentScore-myScore)/denominator;
    var expectedScore = 1/(1.0+Math.pow(10.0, tempExponent));
    return expectedScore;
}

var updateMyScore = function(me, opponent, win){
    var scoreActual;
    //If the player wins the match, their actual score is 1. If they lose, it is zero.
    if (win){
        scoreActual = 1;
    }
    else{
        scoreActual = 0;
    }

    //temp variable
    var oldScore = me.score;
    
    //Finds the expected score to compare to the actual score
    var expectedScore = getExpectedScore(me.score, opponent.score);

    //Updates to the new score based on the current score and the expected score
    me.score = oldScore + K*(scoreActual-expectedScore);
}


//Simplifies the code into just one call to update the scores of both
//Calls updateMyScore to update individual scores for winner and loser
var updateScores = function(winner, loser){
    var tempWinner = { score: winner.score};
    updateMyScore(winner, loser, true);
    updateMyScore(loser, tempWinner, false);
}

var randomInt = function(low, high){
    var range = high-low;
    var num = ((Math.random()*range)+(low-1));
    return Math.round(num);
}

var diffRandomInt = function(a, low, high){
    var b = randomInt(low, high);
    while(b === a){
        b = randomInt(low, high);
    }
    return b;
}

var sortPlayers = function(arr){
    return arr.sort(function (a, b){
        return b.score-a.score;
    });
}

