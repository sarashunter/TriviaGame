$(document).ready(function () {

    var game = {
        wins: 0,
        losses: 0,
        correctGuesses: 0,
        wrongGuesses: 0,
        questions: [],
        questionCounter: 0,
        currentQuestionIndex: 0,

        startRound: function () {

            this.correctGuesses = 0;
            this.wrongGuesses = 0;
            this.questionCounter = 0;
            this.currentQuestionIndex = 0;
            this.setGameTime();
            $("#question").html(this.questions[this.currentQuestionIndex].questionText);
            $("#answers").html(this.questions[this.currentQuestionIndex].displayAnswersHTML);

        },

        //This timer ends the game when time is up.

        setGameTime: function () {
            setTimeout(this.endGame, 8000);
        },

        questionTimeout: function() {
            setTimeout(this.nextQuestion, 3000);
        },

        guessCounter: function (wasCorrect) {
            if (wasCorrect) {
                this.correctGuesses++;
            } else {
                this.wrongGuesses++;
            }
            this.nextQuestion();
        },

        nextQuestion: function () {
            $("#answers").empty();
            $("#question").empty();

            //Check if all questions have been asked.
            if (game.currentQuestionIndex <= game.questions.length - 1) {
                game.currentQuestionIndex++;
                $("#question").html(game.questions[game.currentQuestionIndex].questionText);
                $("#answers").html(game.questions[game.currentQuestionIndex].displayAnswersHTML);
                game.questionTimeout();
            } else {
                game.endGame();
            }
        },

        endGame: function () {
            $("#answers").empty();
            $("#question").empty();
            var finalCountHTML = "<p>Correct: " + game.correctGuesses + "</p><p>Incorrect: " + game.wrongGuesses + "</p>";
            $("#answers").html(finalCountHTML);

        }


    }

    function question(question, answers, indexAnswer) {
        this.asked = false;
        this.indexAnswer = indexAnswer;
        this.questionText = question;
        this.answers = answers;
        game.questions.push(this);
        console.log(game.questions);

        //Display the possible answers.
        this.displayAnswersHTML = function () {
            return "<button class='answer' id='answer0' value='0'> " + answers[0] + "</button></p><p><button class='answer' id='answer1' value='1'> " + answers[1] + "</button></p><p><button class='answer' id='answer2' value='2'> " + answers[2] + "</button></p><p><button class='answer' id='answer3' value='3'> " + answers[3];
        }
    }

    //Create the question objects
    var question1 = new question('Am I a question?', ['maybe', 'probably', 'probably not', 'no'], 1);
    var question2 = new question('Or am I a question?', ['to be', 'or not', 'to be', 'a question'], 3);
    var question3 = new question('Or am I a questionssss?', ['to besss', 'or notsss', 'to bess', 'a questionsss'], 3);

    // $("#question").html(game.questions[game.currentQuestionIndex].displayAnswersHTML);
    game.startRound();

    $('div').on('click', '.answer', function () {
        console.log($(this).val());
        console.log("index answer " + question1.indexAnswer);

        //Check if the value of the button matches the index of the correct answer.
        if ($(this).val() == question1.indexAnswer) {

            //Answer is correct, increase correct guess counter
            console.log("correct!");
            game.guessCounter(true);
        } else {

            //Answer was incorrect, increase wrong guess counter.
            console.log("Not correct!");
            game.guessCounter(false);
        }
    })

    //Pseudo coding:
    //Need object for game (so it can restart).
    //needs to do the timer stuff
    //Number wrong and right
    //Need game initialize function.  next question function

    //Need object for each question?
    //string Question
    //Array answers
    //number indexof correct answer
    //boolean of if it's been asked

})