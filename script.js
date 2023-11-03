const questions = [
    {
        question: "which is largest city in the world?",
        answers: [
            { text: "new york", correct: false},
            { text: "tokyo", correct: true},
            { text: "london", correct: false},
            { text: "hongkong", correct: false},
        ]
    },
    {
        question: " Who wrote the famous play Romeo and Juliet",
        answers: [
            { text: "Jane Austen", correct: false},
            { text: "Charles Dickens", correct: false},
            { text: " Mark Twain", correct: false},
            { text: "William Shakespeare", correct: true},
        ]  
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: " Indian Ocean", correct: false},
            { text: "Atlantic Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
            { text: "Arctic Ocean", correct: false},
        ]  
    },
    {
        question: "which is largest animal in the world?",
        answers: [
            { text: " lion", correct: false},
            { text: " Elephant", correct: false},
            { text: " Giraffe", correct: false},
            { text: " Blue Whale", correct: true},
        ]  
    }
 
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuize(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)

    } );
}

function resetState(){

    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'you scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function  handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuize();
    }
});


startQuize();