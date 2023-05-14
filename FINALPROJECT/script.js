const questions = [
    {
        question: "Which type of fish is Nemo?",
        answers: [
            { text: "Cherry Barb", correct: false},
            { text: "Goldfish", correct: false},
            { text: "Clownfish", correct: true},
            { text: "Clown Loach", correct: false},
        ]
    },
    {
        question: "What do bees consume to make honey?",
        answers: [
            { text: "Nectar", correct: true},
            { text: "Crop", correct: false},
            { text: "Water", correct: false},
            { text: "Pollen", correct: false},
        ] 
    },
    {
        question: "What is the world’s largest ocean?",
        answers: [
            { text: "Arctic Ocean", correct: false},
            { text: "Indian Ocean", correct: false},
            { text: "Atlantic Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
        ]
    },
    {
        question: "Which planet is known to have the most gravity?",
        answers: [
            { text: "Mercury", correct: false},
            { text: "Neptune", correct: false},
            { text: "Earth", correct: false},
            { text: "Jupiter", correct: true},
        ]
    },
    {
        question: "Who was the first Disney princess? ",
        answers: [
            { text: "Snow White", correct: true},
            { text: "Cinderella", correct: false},
            { text: "Aurora", correct: false},
            { text: "Belle", correct: false},
        ]
    },
    {
        question: "In how many years Olympics are held? ",
        answers: [
        { text: "4", correct: true},
        { text: "3", correct: false},
        { text: "5", correct: false},
        { text: "None of the Above", correct: false},
    ]
    },
    {
        question: "How many languages are written from right to left? ",
        answers: [
        { text:"10", correct: false},
        { text:"11", correct: false},
        { text:"12", correct: true},
        { text:"14", correct: false},
    ]  
    },
    {
        question: "What is the rarest M&M color? ",
        answers: [
        { text:"Green", correct: false},
        { text:"Brown", correct: true},
        { text:"Yellow", correct: false},
        { text:"Blue", correct: false},
    ]   
    },
    {
        question: "In which Italian city can you find the Colosseum?",
        answers: [
        { text:"Naples", correct: false},
        { text:"Milan", correct: false},
        { text:"Venice", correct: false},
        { text:"Rome", correct: true},
    ]   
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score= 0;

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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
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
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You Scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}   

function handleNextButton(){
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
        startQuiz();
    }
});


startQuiz();

