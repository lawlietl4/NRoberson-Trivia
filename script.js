const question = document.getElementById("question");
const btn1 = document.getElementById("choiceA");
const btn2 = document.getElementById("choiceB");
const btn3 = document.getElementById("choiceC");
const btn4 = document.getElementById("choiceD");
const score = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let questions = 0;
let correctAnswerNum = 0;
let wrongAnswerNum = 0;
let correctAnswerText;

startBtn.textContent = "Lets do This!";
startBtn.style.visibility = "visible";
btn1.style.visibility = "hidden";
btn2.style.visibility = "hidden";
btn3.style.visibility = "hidden";
btn4.style.visibility = "hidden";

const getQuestions = () => {
	var randomCategory = generateRandomIntegerMinMax(9, 32);
	var randomBtn = generateRandomInteger(4);
	var URL = `https://opentdb.com/api.php?amount=1&category=${randomCategory}&type=multiple&difficulty=easy`;
	score.innerHTML = `Correct answers: ${correctAnswerNum}\nWrong Answers: ${wrongAnswerNum}`;
	fetch(URL)
		.then((response) => response.json())
		.then((promise_data) => {
			correctAnswerText = promise_data.results[0].correct_answer;
			triviaQuestion = promise_data.results[0];
			question.innerHTML = `<h2>${triviaQuestion.question}</h2>`;
			if (randomBtn == 1) {
				btn1.innerHTML = correctAnswerText;
				btn2.innerHTML = triviaQuestion.incorrect_answers[0];
				btn3.innerHTML = triviaQuestion.incorrect_answers[1];
				btn4.innerHTML = triviaQuestion.incorrect_answers[2];
			} else if (randomBtn == 2) {
				btn1.innerHTML = triviaQuestion.incorrect_answers[0];
				btn2.innerHTML = correctAnswerText;
				btn3.innerHTML = triviaQuestion.incorrect_answers[1];
				btn4.innerHTML = triviaQuestion.incorrect_answers[2];
			} else if (randomBtn == 3) {
				btn1.innerHTML = triviaQuestion.incorrect_answers[0];
				btn2.innerHTML = triviaQuestion.incorrect_answers[1];
				btn3.innerHTML = correctAnswerText;
				btn4.innerHTML = triviaQuestion.incorrect_answers[2];
			} else if (randomBtn == 4) {
				btn1.innerHTML = triviaQuestion.incorrect_answers[0];
				btn2.innerHTML = triviaQuestion.incorrect_answers[1];
				btn3.innerHTML = triviaQuestion.incorrect_answers[2];
				btn4.innerHTML = correctAnswerText;
			}
		})
		.catch((error) => console.log(error));
};

const gameOver = () => {
	btn1.style.visibility = "hidden";
	btn2.style.visibility = "hidden";
	btn3.style.visibility = "hidden";
	btn4.style.visibility = "hidden";
	question.style.visibility = "hidden";
	startBtn.style.visibility = "visible";
};

const handleClick = (evt) => {
	if (questions < 10) {
		getQuestions();
		let answerSelected = evt.target.innerHTML.toString();
		if (answerSelected == correctAnswerText) {
			correctAnswerNum += 1;
		} else {
			wrongAnswerNum += 1;
		}
		questions += 1;
		setTimeout(getQuestions(), 1);
	} else {
		gameOver();
	}
};

const startGame = () => {
	questions = 0;
	correctAnswerText = 0;
	wrongAnswerNum = 0;
	btn1.style.visibility = "visible";
	btn2.style.visibility = "visible";
	btn3.style.visibility = "visible";
	btn4.style.visibility = "visible";
	startBtn.style.visibility = "hidden";
	btn1.addEventListener("click", handleClick);
	btn2.addEventListener("click", handleClick);
	btn3.addEventListener("click", handleClick);
	btn4.addEventListener("click", handleClick);
	getQuestions();
};

const generateRandomInteger = (max) => {
	return Math.floor(Math.random() * max) + 1;
};

const generateRandomIntegerMinMax = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};