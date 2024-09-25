const K = 16.0;
const denominator = 400.0;
let defaultScore = 1200.0;



class player{    
    constructor(name = "unknown", score = 1200){
        this.name = name;
        this.score = score;
    }
    

    //After updating, score can be a weird number so this makes it easier to display without changing the exact value
    roundScore(){
        return Math.round(this.score);
    }

    //Uses the algorithm from the Elo system to determine an expected score (probability) of winning
    //More info at https://en.wikipedia.org/wiki/Elo_rating_system#Mathematical_details
    getExpectedScore(opponentScore){
        var tempExponent = (opponentScore-this.score)/denominator;
        var expectedScore = 1/(1.0+Math.pow(10.0, tempExponent));
        return expectedScore;
    }

    updateScore(opponentScore, win){
        var scoreActual;
        //If the player wins the match, their actual score is 1. If they lose, it is zero.
        if (win){
            scoreActual = 1;
        }
        else{
            scoreActual = 0;
        }

        //temp variable that may or may not be necessary for the program to run properly
        var oldScore = this.score;
        
        //Finds the expected score to compare to the actual score
        var expectedScore = this.getExpectedScore(opponentScore);

        //Updates to the new score based on the current score and the expected score
        this.score = oldScore + K*(scoreActual-expectedScore);
    }


    
}


var playerNamesNumbers = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
    "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
    "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
    "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
    "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
    "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", ":3"
];

var playerColors = [
    "red", "orange", "yellow", "green", "blue", "purple"
];

var updateScores = function(winner, loser){
    var temp = winner.score;
    winner.updateScore(loser.score, true);
    loser.updateScore(temp, false);
}

var randomInt = function(low, high){
    var temp = high-low;
    var num = ((Math.random()*temp)+(low-1));
    return Math.round(num);
}

var diffRandomInt = function(a, low, high){
    var b = randomInt(low, high);
    while(b === a){
        b = randomInt(low, high);
    }
    return b;
}

var displayRankings = function(arr){
    arr.sort(function (a, b){
        return b.score-a.score;
    });
    console.log(arr);
}

