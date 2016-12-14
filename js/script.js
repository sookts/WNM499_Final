

'use strict'

var qaJSON = {
	"easy":[
			{
			"question":"Take off my skin - I won't cry, but you will! What am I?",
			"answer":"onion",
			"hint":"It’s round."
			},
			{
			"question": "A seven letter word containing thousands of letters",
			"answer": "mailbox,mail box",
			"hint":"Holds things."
			},
			{
			"question": "What body part is pronounced as one letter but written with three, only two different letters are used?",
			"answer": "eye",
			"hint":"It’s on your face."
			},			
			{
			"question":"What has a foot but no legs?",
			"answer":"ruler,snail",
			"hint":"A measuring tool."
			},		
			{
			"question":"What has one eye but cannot see?",
			"answer":"needle",
			"hint":"Can be found in a sewing kit."
			},
			{
			"question":"If a blue house is made out of blue bricks, a yellow house is made 			out of yellow bricks and a pink house is made out of pink bricks, what is a green house made of?",
			"answer":"glass",
			"hint":"See-through material."
			},
			{
			"question":"What kind of tree can you carry in your hand?",
			"answer":"palm tree,palm",
			"hint":"Found in Los Angeles."
			},
			{
			"question":"Teddy bears are never hungry because they are always what?",
			"answer":"stuffed",
			"hint":"Full."	
			},
			{
			"question":"Mr. Smith has 4 daughters. Each of his daughters has a brother. How many children does Mr. Smith have?	",
			"answer":"five,5",
			"hint":"Least number of brother(s)."
			},
			{
			"question":"What always ends everything?",
			"answer":"g",
			"hint":"Look at the word."
			}

	],
	"normal":[
			{
			"question":"If I drink, I die. If I eat, I am fine. What am I?",
			"answer":"fire",
			"hint":"It’s hot."
			},		
			{
			"question":"Which vehicle is spelled the same forwards and backwards?",
			"answer":"racecar,race car",
			"hint":"You drive fast in it."
			},
			{
			"question":"What flies without wings?",
			"answer":"time",
			"hint":"Clock."
			},
			{
			"question":"What gets wetter and wetter the more it dries?",
			"answer":"towel",
			"hint":"It’s in your bathroom."
			},
			{
			"question":"What five-letter word becomes shorter when you add two letters to it?",
			"answer":"short",
			"hint":"Answer is in the riddle."
			},
			{
			"question":"You will always find me in the past. I can be created in the present, But the future can never taint me. What am I?",
			"answer":"history,memories",
			"hint":"Something you reflect on."
			},
			{
			"question":"I have keys, but no locks. I have space, but no room. You can enter, but not exit. What am I?",
			"answer":"keyboard,key board",
			"hint":"It also has the alphabet and numbers."
			},
			{
			"question":"I’m light as a feather, yet the strongest man can’t hold me for more than 5 minutes. What am I?",
			"answer":"breath",
			"hint":"Swimmers hold this."
			},
			{
			"question":"I am the only organ that named myself. What am I?",
			"answer":"brain",
			"hint":"Think."
			},
			{
			"question":"What goes up when rain comes down?",
			"answer":"umbrella",
			"hint":"Used outdoors."
			}
	],
	"hard":[
			{
			"question":"I have no wallet but I pay my way. I travel the world but in the corner I stay. What am I?",
			"answer":"stamp",
			"hint":"You use it to send things."
			},
			{
			"question":"I’m tall when I’m young and I’m short when I’m old. What am I?",
			"answer":"candle,pencil",
			"hint":"It illuminates."
			},
			{
			"question":"What has 4 eyes but can’t see?",
			"answer":"mississippi",
			"hint":"It's a location."
			},
			{
			"question":"What gets broken without being held?",
			"answer":"promise",
			"hint":"You make these with loved ones."
			},		
			{
			"question":"Poor people have it. Rich people need it. If you eat it you die. What is it?",
			"answer":"nothing",
			"hint":"Not everything or anything."
			},						
			{
			"question":"There was a green house. Inside the green house, there was a white house. Inside the white house, there was a red house. Inside the red house, there were lots of babies. What am I?",
			"answer":"watermelon",
			"hint":"You eat it."
			},		
			{
			"question":"Paul's height is six feet, he's an assistant at a butcher's shop, and wears size 9 shoes. What does he weigh?",
			"answer":"meat",
			"hint":"Where does he work again?"
			},
			{
			"question":"What never asks questions but is always answered. What am I?",
			"answer":"doorbell,door bell",
			"hint":"It’s on every house."
			},
			{
			"question":"They have not flesh, nor feathers, nor scales, nor bone. Yet they have fingers and thumbs of their own. What are they?",
			"answer":"gloves",
			"hint":"Seen during cold weather."
			},
			{
			"question":"The dirtier I am, the whiter I get. Leave a mark on me when you stand, I'll leave a mark on you when you sit. What am I?",
			"answer":"chalkboard,chalk board",
			"hint":"Present in classrooms."
			}
	]
}

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
	// console.log("inited")
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
		hamilton = randomQuestion.hint;
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
	var questionWindow = document.getElementById("questionWindow") 
	

	var a = (function(){
		// var notCaseSensitive = userAnswer.value.toLowerCase(); //make answer to not case sensitive
		//Ignore article(a, an)
		// if(notCaseSensitive[0] == "a"){
		// 	if(notCaseSensitive[1] == " "){
		// 		return notCaseSensitive.substr(2)
		// 	}else if(notCaseSensitive[1] == "n" && notCaseSensitive[2] == " "){
		// 		return notCaseSensitive.substr(3)
		// 	}else{
		// 		return notCaseSensitive;
		// 	}
		// }else{
		// 	return notCaseSensitive;
		// }
		var found = /(a |an |the |bork |one )(\w+)/i.exec(userAnswer.value);
		if(found!==null) return found[2];
		else return userAnswer.value;
	})();

	if(currentQuestion.answer.match(RegExp('(^|,)'+a+'($|,)','i'))!==null){
		// console.log("currentStep",currentStep)
		questionWindow.className = "right"
		animate(currentStep);//from view.js
		currentStep+=1;
		displayLevel();
		displayQuestion(qa,levelControl());
		// console.log(currentStep);
		setTimeout(function(){
			questionWindow.className = ""
		},500)
		displayResult(1)
	}else if(a == ""){
		alert("Enter an answer!")
	}else{
		questionWindow.className = "wrong"
		gotDamage();
		displayHitPoint();
		displayResult(0)
		if(hp <= 0){
			gameOver();
		}
		setTimeout(function(){
			questionWindow.className = ""
		},500)
	}
}

function deleteQuestion(qa,lv){
	// delete qa[lv][questionNumber];
	qa[lv].splice(questionNumber,1);
}

function displayHitPoint(){
	var hpDisplay = document.getElementById("hpDisplay");
	hpDisplay.innerHTML = "LIFE " + hp;
}

function gotDamage(){
	hp--;
}

function displayLevel(){
	var levelDisplay = document.getElementById("levelDisplay");
	currentLevel = levelControl();
	currentLevelNum = currentLevelInString(currentLevel)
	// levelDisplay.innerHTML = "LEVEL " + currentLevel; 
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

function currentLevelInString(levelString){
	switch (levelString){
		case "easy":
		return 0
		break;
		case "normal":
		return 1
		break;
		case "hard":
		return 2
		break;
	}
}


