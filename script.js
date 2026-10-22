
//sound effects
document.addEventListener('DOMContentLoaded', function() {
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('button-sound');
    const soundLinks = document.querySelectorAll('.sound');

    soundLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {
                console.log('Hover sound waiting for initial user interaction.');
            });
        });

        link.addEventListener('click', function(event) {
            const destination = this.getAttribute('href');
            if(!destination || destination === '#' || destination.startsWith('javascript:')) {
                return;
            }
            event.preventDefault();
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
            clickSound.onended = () => {
                window.location.href = destination

            };
        setTimeout(() => {
            window.location.href = destination;
         },250);
        });  
    });
    const soundButtons = document.querySelectorAll('button.sound');
    soundButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        });
    });

});

//quiz question starts

const questions = [
    {
        question: "What does DNA stand for?",
        answers: [
            { text: "Deoxyribonucleic Acid", correct: true },
            { text: "Dynamic Nucleic Acid", correct: false },
            { text: "Duplicated Nucleic Acid", correct: false },
            { text: "Deoxyribose Nucleic Acid", correct: false },
        ]
        
    },
    {
        question: "What is a chromosome?",
        answers: [
            { text: "A long chain molecule made of many repeating units", correct: false },
            { text: "The powerhouse of the cell", correct: false },
            { text: "Tightly packed DNA found in the nucleus", correct: true },
            { text: "Building blocks of organisms", correct: false }
        ]
    },
    {
        question: "What is a gene?",
        answers: [
            { text: "The repeating unit of a DNA molecule", correct: false },
            { text: "The building blocks of your body, Made up of long chains of amino acids", correct: false },
            { text: "Control centre of a cell that contains the genetic information", correct: false },
            { text: "A segment of DNA that codes for a specific protein/trait", correct: true }
        ]
    },
    {
        question: "What is sexual reproduction?",
        answers: [
            { text: "A type of reproduction involving 2 parents, genetically identical children", correct: true },
            { text: "Reproduction that happens in the nucleus, which means that it can only be a bacteria", correct: false },
            { text: "Reproduction involving only one parent resulting in offspring that are genetically identical", correct: false },
            { text: "A type of reproduction involving three parents, causing it to have two genders", correct: false }
        ]
    },
    {
        question: "What is meiosis?",
        answers: [
            { text: "Having a single set of chromosomes occurs in the sex cells", correct: false },
            { text: "The process where a cell divides to produce unique gametes with half the number of chromosomes", correct: true },
            { text: "The process where a single cell divides into two identical daughter cells, for growth and repair", correct: false },
            { text: "Having a pair of each chromosome and occurs in the body cells", correct: false }
        ]
    },
    {
        question: "What is mitosis?",
        answers: [
            { text: "The process where a cell divides to produce unique gametes with half the number of chromosomes", correct: false },
            { text: "Having a single set of chromosomes occurs in the sex cells", correct: false },
            { text: "Having a pair of each chromosome and occurs in the body cells", correct: false },
            { text: "The process where a single cell divides into two identical daughter cells, for growth and repair", correct: true }
        ]
    },
    {
        question: "What is natural selection?",
        answers: [
            { text: "The process where organisms better adapted to their environment are more likely to survive and reproduce, passing on those advantageous traits", correct: true },
            { text: "A group of individuals of the same species living in the same area at the same time, which allows them to reproduce and be happy", correct: false },
            { text: "Change in the numbers/types of alleles in a population over time, which fluctuates due to random chance", correct: false },
            { text: "The difference between individuals within a population due to the alleles they possess, leading to an argument with the other species because of their different traits", correct: false }
        ]
    },
    {
        question: "What is mutation?",
        answers: [
            { text: "Differences that are inherited genetically and are passed onto offspring", correct: false },
            { text: "A characteristic that changes gradually over a range of values", correct: false },
            { text: "A random, permanent change in the base sequence of the DNA", correct: true },
            { text: "Differences that occur due to the environment and that are not passed onto offspring", correct: false }
        ]
    },
    {
        question: "What is genetic tracking?",
        answers: [
            { text: "A technique by which individuals can be compared to others by their genetic markers or DNA banding patterns", correct: false },
            { text: "A gene or sequence of bases with a known location on a chromosome", correct: false },
            { text: "A method for tracking the inheritance of a particular gene through generations of organisms or within a population", correct: true },
            { text: "This type of screening is used to identify individuals who carry a genetic mutation that could be passed on to their children.", correct: false }
        ]
    },
    {
        question: "What is DNA sequencing?",
        answers: [
            { text: "Small sections in the DNA that repeat.", correct: false },
            { text: "The process of identifying the exact order of nucleotide bases in a strand of DNA", correct: true },
            { text: "A method used to identify species based on the base sequence of the genetic marker.", correct: false },
            { text: "The process of sequencing a section of DNA to identify mutations in genes that can cause or increase the risk of a disease such as cancer.", correct: false }
        ]
    }
];

//question scoring

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();




