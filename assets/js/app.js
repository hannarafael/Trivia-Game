//Initial values
let counter = 30;
let currentQuestion= 0;
let score = 0;
let lost = 0;
let timer;


//IF TIMER IS OVER THEN GO TO NEXT QUESTION
function nextQuestion() {

const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;


if (isQuestionOver) {
    //TODO
    console.log("GAME OVER!!");
    displayResult();
} else {
    currentQuestion++;
    loadQuestion();
}

}


//Star 30 second timer for user to respond to questions

function timeUp() {
    clearInterval(timer);

    lost++;
    preLoadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}


function countDown () {
    counter--;

    $("#time").html('Timer:' + " " + counter);
       

    if (counter === 0) {
        timeUp();
    }



}
//Display the qestion and the choices to the browser 


function loadQuestion() {

    counter= 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions [currentQuestion].question;//
    const choices = quizQuestions [currentQuestion].choices; //
    
    
    $("#time").html('Timer:' + " " + counter);
    $("#game").html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);

}
// loop over every choice starting at 0 
function loadChoices(choices){
    let result = '';
    
    for (let i =0; i< choices.length; i++) {

        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    
    return result;


}

//Either correct or wrong answer, go to next question. 
//event delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer=== selectedAnswer) {
     //TO DO 
     // User wins
     score++;
     console.log('wins!');
     preLoadImage('win');
     setTimeout(nextQuestion, 3* 1000);
    } else {
        lost++;
        
        console.log('lost!');
        preLoadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }

});;

function displayResult(){
   const result= `
     <p> You got ${score} question(s) right </p>
     <p> You missed ${lost} question(s)</p>
     <p> Total Questions ${quizQuestions.length} question(s) </p>
     <button class="btn primary" id="reset">Reset Game</button>
   
   
   `;
    $ ('#game').html(result);


}

$(document).on('click', '#reset', function(){
  counter= 5;
  currentQuestion= 0;
  score= 0;
  lost= 0;
  timer= null;

  loadQuestion();

});;

function loadRemainingQuestion(){
     const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
     const totalQuestion = quizQuestions.length;

     return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;


}

//DISPLAY GIPHY FOR CORRECT OR WRONG ANSWER
function preLoadImage(status){
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
        <p class ="preload-image"> Congrats, you got the right answer!</p>
        <p class="preload-image"> The correct answer is${correctAnswer}</p>
        `);
    } else {
        $('#game').html(`
        <p class ="preload-image"> the correct answer was ${correctAnswer}</p>
        <p class="preload-image"> You lost!</p>
        `);
    }
}


$('#start').click(function(){

    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});;






