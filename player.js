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


var players = [

];


