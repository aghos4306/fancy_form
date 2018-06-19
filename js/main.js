//Input Fields Array
const questions = [
    {question: 'Enter Your First Name pls'},
    {question: 'Enter Your Last Name pls'},
    {question: 'Enter Your Email pls', pattern: /\S+@\S+\.\S+/},
    {question: 'Create Your Password pls', type: 'password'}
];

//Transition Times
const shakeTime = 100;
const switchTime = 200;

//Init Position at First Questions
let position = 0;

//Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//EVENTS LISTENERS
document.addEventListener('DOMContentLoaded', getQuestion);

//Next Button Click Event
nextBtn.addEventListener('click', validate)

//Input field Enter click
inputField.addEventListener('keyup', function(e){
    if(e.keyCode == 13) {
        validate();
    }
})

//FUNCTIONS
function getQuestion(){
     inputLabel.innerHTML = questions[position].question;   //get question from array
     inputField.type = questions[position].type || 'test';  //get the type
     inputField.value = questions[position].answer || '';   //get the value from input field
     inputField.focus();                                    //focuses on current elment

     //Set Progress Bar Width - Variable to the questions array length
     progress.style.width = (position * 100) / questions.length + '%';

     //Add User Icon or Back Arrow
     prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

     showQuestion();
}

//Display Questions to User
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

//Hide Question from Users
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

//Transform to creat form shake Motion
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

//Validate Field
function validate() {
    if(!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail();
    } else {
        inputPass();
    }
}

//Field Input Failed
function inputFail() {
    formBox.className = 'error';
    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20,
      0);
      setTimeout(transform, shakeTime * 6, 0, 0);
      inputField.focus();
    }
}

//Field Input Passed
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //Store Answer in Array
    questions[position].answer = inputField.value;

    //Increment position to change the question
    position++;

    //If new question, hide current and get next
    if(questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        hideQuestion();                         //Remove if no more questions
        formBox.className = 'close';
        progress.style.width = '100%';

        //Form complete
        formComplete();
    }
}

//All Fields filled in, show h1.end
function formComplete() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}
    You are now registered and will hear from us shortly`));

    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}
