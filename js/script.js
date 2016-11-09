

'use strict'

var qaJSON = {
	"easy":[
		{
			"question": "A seven letter word containing thousands of letters",
			"answer": "mailbox"
		},
		{
			"question":"What has a foot but no legs?",
			"answer":"snail"
		},
		{
			"question":"I’m tall when I’m young and I’m short when I’m old. What am I?",
			"answer":"candle",
			"alternateAnswer":"pencil"
		},
		{
			"question":"What goes up when rain comes down?",
			"answer":"umbrella"
		},
		{
			"question":"If I drink, I die. If I eat, I am fine. What am I?",
			"answer":"fire"
		},
		{
			"question":"What has one eye but cannot see?",
			"answer":"needle"
		},
		{
			"question":"If a blue house is made out of blue bricks, a yellow house is made out of yellow bricks and a pink house is made out of pink bricks, what is a green house made of?",
			"answer":"glass"
		},
		{
			"question":"Teddy bears are never hungry because they are always what?",
			"answer":"stuffed"
		}
	],
	"normal":[
		{
			"question":"What has 4 eyes but can’t see?",
			"answer":"mississippi"
		},
		{
			"question":"Which vehicle is spelled the same forwards and backwards?",
			"answer":"racecar"
		},
		{
			"question":"What flies without wings?",
			"answer":"time"
		},
		{
			"question":"What five-letter word becomes shorter when you add two letters to it?",
			"answer":"short"
		},
		{
			"question":"What gets broken without being held?",
			"answer":"promise"
		}
	],
	"hard":[
		{
			"question":"Poor people have it. Rich people need it. If you eat it you die. what is it?",
			"answer":"nothing"
		},
		{
			"question":"There was a green house. Inside the green house there was a white house Inside the white house there was a red house. Inside the red house there were lots of babies. What am I?",
			"answer":"watermelon"
		},
		{
			"question":"A little pool with two layers of wall around it. One white and soft and the other dark and hard, amidst a light brown grassy lawn with an outline of a green grass. What am I?",
			"answer":"coconut"
		},
		{
			"question":"You will always find me in the past. I can be created in the present, But the future can never taint me. What am I?",
			"answer":"history"
		},
		{
			"question":"What is it that no man ever yet did see, which never was, but always is to be?",
			"answer":"tomorrow"
		}
	]
}

var currentStep;
var hp;
var currentLevel;
var result;

var currentQuestion;
var questionNumber;

var initialize = true;
if(initialize == true){
	init();
	displayQuestion(qaJSON,levelControl());
	initialize = false;
}


//Initialize
function init(){
	var resultDisplay = document.getElementById("resultDisplay");
	resultDisplay.innerHTML = "";
    currentStep = 0;
	hp = 3;
	displayHitPoint();
	displayLevel();
}




document.querySelector("#userAnswerInput").addEventListener("keypress", function(e){
	var key = e.which || e.keyCode;
	if(key == 13){ // 13 is key code of "enter"
		evaluateUserInput(qaJSON)
		clearInput();
	}
});


function clearInput(){
	var userAnswer = document.getElementById("userAnswerInput"); 
	userAnswer.value = "";
}


function displayQuestion(qa,lv){
	var questionDisplay = document.getElementById("questionDisplay");
	if(lv != "clear"){
		questionNumber = Math.floor(Math.random() * qa[lv].length);
		var randomQuestion = qa[lv][questionNumber];
		// console.log("questionNumber",questionNumber)
		questionDisplay.innerHTML = randomQuestion.question;
		currentQuestion = randomQuestion;
		deleteQuestion(qa,lv);
	}else{
		gameClear();
	}
}

function displayResult(rw){
	
	var color;
	switch (rw){
		case 0:
			result = "WRONG!"
			color = "#ff6571"
		break;
		case 1:
			result = "RIGHT!"
			color = "#65ff89"
		break;
	}
	var resultDisplay = document.getElementById("resultDisplay");
	resultDisplay.innerHTML = result;
	resultDisplay.style.color = color;
}

// @param {object} the question and answer from JSON
// Evaluate user input
function evaluateUserInput(qa){
	var userAnswer = document.getElementById("userAnswerInput"); 
	

	var a = (function(){
		var notCaseSensitive = userAnswer.value.toLowerCase(); //make answer to not case sensitive
		//Ignore article(a, an)
		if(notCaseSensitive[0] == "a"){
			if(notCaseSensitive[1] == " "){
				return notCaseSensitive.substr(2)
			}else if(notCaseSensitive[1] == "n" && notCaseSensitive[2] == " "){
				return notCaseSensitive.substr(3)
			}else{
				return notCaseSensitive;
			}
		}else{
			return notCaseSensitive;
		}
	})();

	if(a == currentQuestion.answer || a == currentQuestion.alternateAnswer){
		currentStep++;
		displayLevel();
		displayQuestion(qa,levelControl());
		console.log(currentStep);
		displayResult(1)
	}else if(a == ""){
		alert("Enter an answer!")
	}else{
		gotDamage();
		displayHitPoint();
		displayResult(0)
		if(hp <= 0){
			gameOver();
		}
	}
}

function deleteQuestion(qa,lv){
	// delete qa[lv][questionNumber];
	qa[lv].splice(questionNumber,1);
}

function displayHitPoint(){
	var hpDisplay = document.getElementById("hpDisplay");
	hpDisplay.innerHTML = "LIFE " + hp;
	if (hp == 2){
		$(".hp3").toggleClass("hide")
	}else if(hp == 1){
		$(".hp2").toggleClass("hide")
	}else if(hp == 0){
		$(".hp1").toggleClass("hide")
	}else if(hp == 3){
		$(".hp1").removeClass("hide")
		$(".hp2").removeClass("hide")
		$(".hp3").removeClass("hide")
	}
}

function gotDamage(){
	hp--;
}

function displayLevel(){
	var levelDisplay = document.getElementById("levelDisplay");
	currentLevel = levelControl();
	levelDisplay.innerHTML = "LEVEL " + currentLevel;
}

function levelControl(){
	var eachLevelQuestionsAmount = 5;
	if(currentStep >= 0 && currentStep <= eachLevelQuestionsAmount-1){
		console.log("easy");
		return "easy"
	}else if(currentStep >= eachLevelQuestionsAmount && currentStep <= (eachLevelQuestionsAmount*2)-1){
		console.log("normal");
		return "normal"
	}else if(currentStep >= (eachLevelQuestionsAmount*2) && currentStep <= (eachLevelQuestionsAmount*3)-1){
		console.log("hard");
		return "hard"
	}else if(currentStep >= (eachLevelQuestionsAmount*3)){
		console.log("clear");
		return "clear"
	}else{
		console.error("Something went wrong!")
	}
}

function gameOver(){
	alert("Game Over!");
	init();
}

function gameClear(){
	alert("Game Clear!");
	init();
	window.location.href = 'http://tatsuma.co/AAU/WNM499/WNM499_Final/clear'
}

// var displayHintTimer = setInterval(something,1000)

function showHint(qa,lv){
	// var thisQuestion = qa[lv][questionNumber];
	var hintDisplay = document.getElementById("histDisplay");
	for(var i = 0; i < qa[lv][questionNumber].answer.length; i++){
		setTimeout(
			function(){
				console.log("working")
				hintDisplay.value = qa[lv][questionNumber].answer.substr(0,i)
			},3000)
	}
}


