$(document).ready(function () {

    var game = {
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
            game.currentQuestion=game.questions[game.currentQuestionIndex];
            $("#question").html(this.questions[this.currentQuestionIndex].questionText);
            $("#answers").html(this.questions[this.currentQuestionIndex].displayAnswersHTML);
            game.questionTimeout();

        },


        questionTimeout: function () {
            this.answerTime = setTimeout(this.timeRanOut, 10000);
        },

        timeRanOut: function () {
            $("#instructions").html('<h3>Time is Up</h3> <iframe src="https://giphy.com/embed/JyKLhxwBo6WNa" width="400" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>The correct answer was ' + game.currentQuestion.answers[game.currentQuestion.indexAnswer] + "</p>");
            $("#answers").empty();
            $("#question").empty();
            game.wrongGuesses++;

            setTimeout(
                function () {
                    $("#instructions").empty();
                    this.currentQuestionIndex++;
                    game.nextQuestion();

                }, 5000);
        },
        guessCounter: function (wasCorrect) {
            if (wasCorrect) {
                this.correctGuesses++;
                $("#instructions").html('<h3>Correct</h3><iframe src="https://giphy.com/embed/DvbEI4LAFaZaw" width="40git0" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
                $("#question").empty();
                $("#answers").empty();
                setTimeout(
                    this.nextQuestion, 3000);
            } else {
                this.wrongGuesses++;
                $("#instructions").html('<h3>Incorrect</h3> <iframe src="https://giphy.com/embed/3o7TKAwfiJfUW85bKo" width="400" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>The correct answer was ' + game.currentQuestion.answers[game.currentQuestion.indexAnswer] + "</p>" );
                $("#question").empty();
                $("#answers").empty();
                setTimeout(
                    this.nextQuestion, 3000);

            }
            // this.nextQuestion();
        },

        nextQuestion: function () {
            $("#instructions").empty();
            $("#answers").empty();
            $("#question").empty();
            //Check if all questions have been asked.
            if (game.currentQuestionIndex < game.questions.length - 1) {

                game.currentQuestionIndex++;
                game.currentQuestion=game.questions[game.currentQuestionIndex];
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
        this.questionText = "<p>"+question+"</p>";
        this.answers = answers;
        game.questions.push(this);
        console.log(game.questions);

        //Display the possible answers.
        this.displayAnswersHTML = function () {
            return "<button class='answer btn btn-light' id='answer0' value='0'> " + answers[0] + "</button></p><p><button class='answer btn btn-light' id='answer1' value='1'> " + answers[1] + "</button></p><p><button class='answer btn btn-light' id='answer2' value='2'> " + answers[2] + "</button></p><p><button class='answer btn btn-light' id='answer3' value='3'> " + answers[3];
        }
    }

    //Create the question objects
    var question1 = new question('The team that is now known as the Cubs has undergone a great number of name changes. What was the very first name of this old franchise?', ['Chicago White Stockings', 'Chicago Colts', 'Chicago Orphans', 'Chicago Giants'], 0);
    var question2 = new question("In the first year of this franchise, they played individually set up exhibitions. They became a charter member of the National Association, and began play at Union Baseball Grounds. However, later in the season, the park was destroyed. What event led to the destruction of the teams first park?", ['The 1891 Earthquake', 'The ballpark was blown up to make way for City Hall', 'Flu Epidemic', 'Great Chicago Fire'], 3);
    var question3 = new question('The Chicago team made several key moves after the 1875 season. One was acquiring this pitcher, who would eventually go on to co-found a sporting goods company that is one of the largest in the world today. Who is he?', ['Philip Knight', 'Alfred Rawlings', 'Ernest Reebok', 'Albert Spalding'], 3);

    var question4 = new question('The 1906 Chicago Cubs were one of the most dominant baseball teams in history, winning 116 out of 154 games. However, they lost the 1906 World Series to which team?', ['Chicago White Sox', 'New York Yankees', 'New York Giants', 'Cleveland Indians'], 0);

    var question5 = new question('Franklin P. Adams wrote a poem that appeared in the leading baseball magazine at that time, "Baseballs Sad Lexicon". This poem gave star status to three players for the Cubs, all who were the subject of the poem. Which one of these Cubs infielders was not one of the three?', ['Johnny Evers', 'Joe Tinker', 'Harry Steinfeldt', 'Frank Chance'], 2);

    var question6 = new question("The Cubs appeared in the World Series in 1932 against Babe Ruth, Lou Gehrig, and the rest of Murderer's Row. This series is undoubtedly best remembered for the alleged called shot of Babe Ruth, when he supposedly predicted he would hit a home run before doing so. What Cubs pitcher gave up the called shot?", ['Charlie Root', 'Hack Wilson', 'Joe Bush', 'Bobby Precioso'], 0);

    var question7 = new question('"The Curse of the Billy Goat" is one of the longest superstitions in baseball history, made in 1945 when what man was asked to leave because of his goats stinky smell?', ['Frank Blanthers, Jr.', 'Billy Sianis', 'Joseph Hinton', 'Edgar Roosevelt'], 1);

    var question8 = new question('The Cubs went through two decades of bad records until what manager came in 1966, and led the Cubs to a near appearance in the World Series in 1969?', ['Bob Kennedy', 'Whitey Lockman', 'Leo Durocher', 'Lou Klein'], 2);

    var question9 = new question('The Cubs acquired a pitcher from the Indians during the 1984 season. This pitcher would win the Cy Young that year, and help the Cubs make their first postseason appearance since 1945. What was this Cy Young winners name?', ['Alex Rooja', 'Rick Sutcliffe', 'Fergie Jenkins', 'Kevin Johnson'], 1);

    var question10 = new question('In perhaps the most prominent example of the Curse of the Billy Goat, a fan named Steve Bartman reached out for a ball when the Cubs were just five outs away from a World Series appearance. This play led to a flurry of hits and runs by the Florida Marlins, their opponent. What player hit the ball that Bartman reached out for?', ['Mike Lowell', 'Miguel Cabrera', 'Luis Castillo', 'Ivan Rodriguez'], 1);


    // $("#question").html(game.questions[game.currentQuestionIndex].displayAnswersHTML);
    game.startRound();

    $('div').on('click', '.answer', function () {
        console.log($(this).val());
        console.log("index answer " + game.questions[game.currentQuestionIndex].indexAnswer);
        clearTimeout(game.answerTime);

        //Check if the value of the button matches the index of the correct answer.
        if ($(this).val() == game.questions[game.currentQuestionIndex].indexAnswer) {

            //Answer is correct, increase correct guess counter
            console.log("correct!");
            game.guessCounter(true);
        } else {

            //Answer was incorrect, increase wrong guess counter.
            console.log("Not correct!");
            game.guessCounter(false);
        }
    })

})