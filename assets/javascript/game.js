$(document).ready(function(){
    $("#start-button").on("click", gameState.startTimer);
});

var gameState = {
    timeRemaining : 60,

    startTimer: function() {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        trivia.displayQuestions();
    },

    countdown: function() {
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if(gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    stopTimer: function() {
        clearInterval();
        trivia.checkAnswers();
    },
     showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
         $("#end-page").show();
         $("#question-box").empty();
         $("#timer").empty();
         $("#timer").hide();
         $("#correct-answers").text("Correct answers: " + numCorrect);
         $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
         $("#unanswered").text("Skipped questions: " + numUnanswered);
     }
}

var trivia = {
    displayQuestions: function() {
        var divContainer = $("#question-box");
        divContainer.append('<h2>Answer the following questions:</h2>');

        for ( var i = 0; i < questionBank.length; i++) {
            divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

            var answer1 = questionBank[i].answers[0];
            var answer2 = questionBank[i].answers[1];
            var answer3 = questionBank[i].answers[2];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
        }
            var doneButton = '<button class="btn btn-outline-light" id="done-button" type="submit">Done</button>';
            divContainer.append(doneButton);
            $("#done-button").on("click", gameState.stopTimer);
        },

        checkAnswers: function() {
         var correctAnswer;
         var userAnswer;
         var numCorrect = 0;
         var numIncorrect = 0;
         var numUnanswered = 0;

         for ( var i = 0; i < questionBank.length; i++) {
             correctAnswer = questionBank[i].correct;
             userAnswer = $('input[id=radio' + i +']:checked + label').text();

             if ( userAnswer === correctAnswer) {
                 numCorrect++;
             } else if (userAnswer === "") {
                 numUnanswered++;
             } else if (userAnswer !== correctAnswer) {
                 numIncorrect++;
             }
         }
        

        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
}

var questionBank =
      [
        {
          question: "A vertical tasting involves:",
          answers: ["Wines from the same year but from different vineyards or winemakers", "Wines from the same vineyards or winemakers but from different years", "Tasting wines while standing up"],
          correct: "Wines from the same vineyards or winemakers but from different years"
        },
      
        {
          question: "When at a restaurant and a small amount of wine is poured to taste, the purpose here is to:",
          answers: ["See if you like the wine", "Make sure it is the wine you thought it was", "Make sure the wine is not spoiled"],
          correct: "Make sure the wine is not spoiled"
        },
        {
          question: "Why should you drink dry wines before sweet wines?",
          answers: ["To make the sweet wine seem less sweet", "To make the sweet wine seem full-bodied", "To prevent the dry wine from seeming overly dry"],
          correct: "To prevent the dry wine from seeming overly dry"
        },
        {
          question: "What is the dominant grape in Chianti wines?",
          answers: ["Sangiovese", "Dolcetto", "Zinfandel"],
          correct: "Sangiovese"
        },
        {
          question: "Black pepper, plum and blackberry flavors describe which wine?",
          answers: ["Beaujolais", " Shiraz", "Pinot Grigio"],
          correct: " Shiraz"
        },
        {
          question: "What does appellation refer to in France?",
          answers: ["Wines with an apple flavor", "Place of origin of the wine", "Wines from the mountains"],
          correct: "Place of origin of the wine"
        },
        {
          question: "Which does NOT necessarily mean a spoiled bottle of wine?",
          answers: ["Moldy Smell", "Bottle Stink", "Vinegar Smell"],
          correct: "Bottle Stink"
        }
        
      ]