//Initial values
let counter = 5;
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
} else {
    currentQuestion++;
    loadQuestion();
}

}


//Star 30 second timer for user to respond to questions

function timeUp() {
    clearInterval(timer);

    lost++;

    nextQuestion();
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

    counter= 5;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions [currentQuestion].question;//
    const choices = quizQuestions [currentQuestion].choices; //
    
    
    $("#time").html('Timer:' + " " + counter);
    $("#game").html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    `);

}

function loadChoices(choices){
    let result = '';
    
    for (let i =0; i< choices.length; i++) {

        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;


}

//Either correct or wrong answer, go to next question. 


loadQuestion();





