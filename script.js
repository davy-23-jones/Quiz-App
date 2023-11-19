const questions = [
    {
        question:"Which is the largest mammal in the world?",
        answers:[
                {text:"Shark", correct: false},
                {text:"Blue Whale", correct: true},
                {text:"Elephant", correct: false},
                {text:"Giraffe", correct: false}
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
                {text:"Asia", correct: false},
                {text:"Austrailia", correct: true},
                {text:"Arctic", correct: false},
                {text:"Africa", correct: false}
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
                {text:"Kalahari", correct: false},
                {text:"Gobi", correct: false},
                {text:"Sahara", correct: true},
                {text:"Thar", correct: false}
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
                {text:"Vatican City", correct: true},
                {text:"Bhutan", correct: false},
                {text:"Nepal", correct: false},
                {text:"Shri Lanka", correct: false}
        ]
    },
];

const questoinElement = document.getElementById("Question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questoinElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}
function resetState(){
    nextButton.style.display = "None";
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
    }
    else{ 
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        resetState();
        questoinElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
}
startQuiz();
