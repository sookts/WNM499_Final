var currentStep = 0;
console.log("var currentStep",currentStep);
var hp;
var currentLevel;
var currentLevelNum;
var result;

var currentQuestion;
var questionNumber;

var initialize = true;

var forward = 1;
var animation;

var currentLevelStep = 0;

var scenes = [];
var monstersArray = []
var monstersSpriteArray = {
	"attack": [],
	"dead": []
}

// var animMode = "attack";
// var animStep = 0;
var ctx = []
var canvasLayerAmount = 3
var scenesAmount = 15;
var initScreenSize = true;
let currentLevelImageSize;

var allTreeImageAssetsCount = 0;
var allMonstersImageAssetsCount = 0;

var hamilton;