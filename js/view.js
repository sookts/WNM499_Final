var treeImageAssets = [
	
	[
	"../assets/images/trees/easy/tree-01.svg",
	"../assets/images/trees/easy/tree-02.svg",
	"../assets/images/trees/easy/tree-03.svg",
	"../assets/images/trees/easy/tree-04.svg",
	"../assets/images/trees/easy/tree-05.svg",
	"../assets/images/trees/easy/tree-06.svg",
	"../assets/images/trees/easy/tree-07.svg",
	"../assets/images/trees/easy/tree-08.svg",
	"../assets/images/trees/easy/tree-09.svg",
	"../assets/images/trees/easy/tree-10.svg",
	"../assets/images/trees/easy/tree-11.svg",
	"../assets/images/trees/easy/tree-12.svg"
	],
	[
	"../assets/images/trees/normal/tree-01.svg",
	"../assets/images/trees/normal/tree-02.svg",
	"../assets/images/trees/normal/tree-03.svg",
	"../assets/images/trees/normal/tree-04.svg",
	"../assets/images/trees/normal/tree-05.svg",
	"../assets/images/trees/normal/tree-06.svg",
	"../assets/images/trees/normal/tree-07.svg",
	"../assets/images/trees/normal/tree-08.svg",
	"../assets/images/trees/normal/tree-09.svg",
	"../assets/images/trees/normal/tree-10.svg",
	"../assets/images/trees/normal/tree-11.svg",
	"../assets/images/trees/normal/tree-12.svg"
	],
	[
	"../assets/images/trees/hard/tree-01.svg",
	"../assets/images/trees/hard/tree-02.svg",
	"../assets/images/trees/hard/tree-03.svg",
	"../assets/images/trees/hard/tree-04.svg",
	"../assets/images/trees/hard/tree-05.svg",
	"../assets/images/trees/hard/tree-06.svg",
	"../assets/images/trees/hard/tree-07.svg",
	"../assets/images/trees/hard/tree-08.svg",
	"../assets/images/trees/hard/tree-09.svg",
	"../assets/images/trees/hard/tree-10.svg",
	"../assets/images/trees/hard/tree-11.svg",
	"../assets/images/trees/hard/tree-12.svg"
	]
	
]

var monsterAssets = [
	[
		"../assets/images/spriteSheets/easy/1",
		"../assets/images/spriteSheets/easy/2",
		"../assets/images/spriteSheets/easy/3",
		"../assets/images/spriteSheets/easy/4",
		"../assets/images/spriteSheets/easy/5"
	],
	[
		"../assets/images/spriteSheets/medium/1",
		"../assets/images/spriteSheets/medium/2",
		"../assets/images/spriteSheets/medium/3",
		"../assets/images/spriteSheets/medium/4",
		"../assets/images/spriteSheets/medium/5"
	],
	[
		"../assets/images/spriteSheets/hard/1",
		"../assets/images/spriteSheets/hard/2",
		"../assets/images/spriteSheets/hard/3",
		"../assets/images/spriteSheets/hard/4",
		"../assets/images/spriteSheets/hard/5"
	]
]

var layerAmount = 1;
var treeAmountForOneSide = 15


window.onload = function(){
	for(var i = 0; i < canvasLayerAmount; i++){
		// console.log('canvas'+i);
		ctx[i] = document.getElementById('canvas'+i).getContext('2d');

	}
	

	// console.log(allTrees)
	for(var i = 0; i < scenesAmount; i++){
		var level = Math.floor(i/5)
		scenes.push( new OneScene(level,i+1))
		scenes[i].randomTreeImageChoice()
		monstersArray.push( new Monster(level,i))
		monstersSpriteArray.attack.push( new SpriteSheet(monsterAssets[Math.floor(i/5)][i%5]+"/attack.png", 500, 500, 3, 10));
		monstersSpriteArray.dead.push( new SpriteSheet(monsterAssets[Math.floor(i/5)][i%5]+"/dead.png", 500, 500, 3, 10));
	}

	// function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame)
	// spritesheet = new SpriteSheet(monsterAssets[0][0]+"/attack.png", 500, 500, 3, 10);

	for(var s = 0; s < scenes.length; s++){
		allMonstersImageAssetsCount++;
		for(var at = 0; at < scenes[s].allTrees.length; at++){
			for(var t = 0; t < scenes[s].allTrees[at].length; t++){
				allTreeImageAssetsCount++;
			}
		}
	}
	initDraw()
	// animateSprite("dead",1)
}

function Tree(lv,id){
  var t = this;
  this.img = new Image();
  this.loaded = false;
  this.img.addEventListener("load",function(){
    t.loaded = true;
  },false)
  this.img.src = treeImageAssets[lv][Math.floor(random(treeImageAssets[lv].length))];
}



function initDraw(){
	var loadingDiv = document.getElementById("loading")
	var readyForTree = 0
	var readyForMonster = 0
	for(var s in scenes){
		// console.log(s/5,s%5,monstersArray[s/5],monstersArray[s/5][s%5])
		if(monstersArray[s].atkloaded)readyForMonster++;
		if(monstersArray[s].deadloaded)readyForMonster++;
		for(var at in scenes[s].allTrees){
			// console.log(readyForMonster)
			// console.log(allMonstersImageAssetsCount)
			for(var t in scenes[s].allTrees[at]){
				if(scenes[s].allTrees[at][t].loaded) readyForTree++;
			}
		}
	}

	// console.log(readyForTree,allTreeImageAssetsCount,readyForMonster,allMonstersImageAssetsCount)
	if(readyForTree==allTreeImageAssetsCount && readyForMonster == allMonstersImageAssetsCount*2) {

		console.log("success")
		drawBackground();
		for(var i = scenesAmount-1; i >= 0; i--){
			scenes[i].draw(i);
			// monstersArray[i].appear();
		}
		// spritesheet.draw(500,500)
		// monstersArray[0].appear();
		if(initScreenSize){
			currentLevelImageSize = scenes[0].imageSize.height();
			console.log(currentLevelImageSize)
			initScreenSize = false;
		}
		loadingDiv.className = "loadingDone"
		// loadingDiv.style.visiblity = "hidden"
		setTimeout(function(){
			loadingDiv.style.display = "none";
		},1000)

	}else{
		loadingDiv.style.display = "block"

		// loadingDiv.style.position = "absolute"
		// loadingDiv.style.width = "500px"
		// loadingDiv.style.height = "500px"
		console.log("not yet")
		setTimeout(initDraw,50)
	}
}


function OneScene(lv,z){
	// console.log("lv",lv)
	this.level = lv
	this.allTrees = []

	for(var j = 0; j < 3; j++){
		this.allTrees.push([])
		for(var i =0; i < treeImageAssets[j].length; i++){
			this.allTrees[j].push(new Tree(j,i))
			// console.log("working")
		}
	}
	this.firstLoad = true;
	this.leftImage;
	this.rightImage;
	this.leftTreeImageArray = []
	this.rightTreeImageArray = [] 
	this.randomTreeId = {
		left: [],
		right: []
	}
	// this.treeRandomPos = {
	// 	left:{
	// 		x:[],
	// 		y:[]
	// 	},
	// 	right:{
	// 		x:[],
	// 		y:[]
	// 	}
	// }
}

OneScene.prototype.randomTreeImageChoice = function(){
	for(var i = 0; i < layerAmount; i++){
		this.randomTreeId.left.push([])
		this.randomTreeId.right.push([])
		for(var j = 0; j < treeAmountForOneSide; j++){
			this.randomTreeId.left[i][j] = Math.floor(random(this.allTrees[0].length)) //Initialize Tree assets
			this.randomTreeId.right[i][j] = Math.floor(random(this.allTrees[0].length))
		}
	}
}


OneScene.prototype.draw = function(z){
	var distanceChangeCalcByZ = (window.innerHeight*1.5)/(scenesAmount/3)

	// console.log(distanceChangeCalcByZ)
	for(var i = 0; i < layerAmount; i++){
		this.leftTreeImageArray.push([])
		this.rightTreeImageArray.push([])
		// this.treeRandomPos.left.x.push([])
		// this.treeRandomPos.right.x.push([])
		// this.treeRandomPos.left.y.push([])
		// this.treeRandomPos.right.y.push([])
		for(var j = 0; j < treeAmountForOneSide; j++){
			
			// this.leftTreeImageArray[i].push(this.allTrees[currentLevelNum][Math.floor(random(this.allTrees[currentLevelNum].length))].img);
			// this.rightTreeImageArray[i].push(this.allTrees[currentLevelNum][Math.floor(random(this.allTrees[currentLevelNum].length))].img);

			this.leftTreeImage = this.allTrees[currentLevelNum][this.randomTreeId.left[i][j]].img
			this.rightTreeImage = this.allTrees[currentLevelNum][this.randomTreeId.right[i][j]].img
			// console.log("this.leftTreeImage", this.leftTreeImage);
			// console.log("this.rightTreeImage", this.rightTreeImage);
			// console.log(this.allTrees[currentLevelNum][0])
			// console.log(this.randomTreeId.left[i])

			this.ratioHtoW = {
				left: this.leftTreeImage.width/this.leftTreeImage.height,
			}

			this.imageSize = {height:0,width:0} //init 
			this.imageSize.height = function(){
					var start = window.innerHeight*1.5;
					for(var a = 0; a < z; a++){
						start = start * 0.5
					}
					return start * forward
				}
			
			
			this.imageSize.width = this.imageSize.height() * this.ratioHtoW.left

			this.perspectivePositionShift = (window.innerHeight-(window.innerHeight-this.imageSize.height()))*0.1
			// console.log(this.perspectivePositionShift)
			this.treePosition = {
				x:{ 
					left: (window.innerWidth/2 - this.imageSize.width/2) - (this.imageSize.width/2.2) - (j*this.imageSize.width)/5 + (this.imageSize.width/window.innerHeight),// - this.perspectivePositionShift,//random(j*this.imageSize.width/2),
					right: (window.innerWidth/2 - this.imageSize.width/2) + (this.imageSize.width/2.2) + (j*this.imageSize.width)/5,// + this.perspectivePositionShift
				},
				y: (window.innerHeight/2 - (this.imageSize.height()/2)) - this.imageSize.height()/5 + (j*this.imageSize.height())/50,// + (j*10)//(window.innerHeight/2 + window.innerHeight/7) - (this.imageSizeLeft.height/2)
			}
			

			// console.log(imageSizeLeft.height * (i+1) / (this.zoomScale/1500))
			// console.log(this.treePosition.left - (this.imageSizeLeft.width/2))
			

			

			if(this.imageSize.height() > 5 || this.imageSize.height() < 2000){ //don't draw if it's too small or too big
				ctx[1].drawImage(
					this.leftTreeImage,
					this.treePosition.x.left,
					this.treePosition.y,
					this.imageSize.width,
					this.imageSize.height()
				)

				ctx[1].drawImage(
					this.rightTreeImage,
					this.treePosition.x.right,
					this.treePosition.y,
					this.imageSize.width,
					this.imageSize.height()
				)
			}
		}
	}
}

function random(max){
	return (Math.random()*max);
}



// addEventListener("click",function(){
// 	// console.log("click");
// 	// console.log("currentLevelStep",currentLevelStep)
// 	// animate();
// })

function animate(currentStep){
	// console.log("step",step)
	// console.group()
	// 	console.log("currentStep",currentStep)
	// 	console.log("scenes[currentStep + 1].imageSize.height()",scenes[currentStep + 1].imageSize.height())
	// console.groupEnd()
	// ctx[0].clearRect(0, 0, canvas0.width, canvas0.height) //Erase everything
	ctx[1].clearRect(0, 0, canvas1.width, canvas1.height) //Erase everything
	forward = forward * 1.02 //Enlarge a bit 
	drawBackground();
	for(var i = scenesAmount-1; i >= 0; i--){
		scenes[i].draw(i);
	}
	
	if(scenes[currentStep + 1].imageSize.height() >= currentLevelImageSize){
		// clearInterval(animation)
		console.log("currentLevelStep",currentLevelStep)
		console.log("currentStep",currentStep);
		monstersArray[currentLevelStep].appear();
		// console.log(currentStep)

		console.log("monstersArray[currentLevelStep]",monstersArray[currentLevelStep]);
		// monstersSpriteArray.attack[currentStep]
		// console.log(monstersSpriteArray.attack[currentStep])
		// monstersSpriteArray
	}else{
		animation = setTimeout(function(){
			animate(currentStep);
		},0)
	}
}

function drawBackground(){
	//sky
	ctx[0].rect(0,0,window.innerWidth,window.innerHeight/2)
	ctx[0].fillStyle = "rgb(0, 100, 150)"
	ctx[0].fillRect(0,0,window.innerWidth,window.innerHeight/2)
	//ground
	ctx[0].rect(0,window.innerHeight/2,window.innerWidth,window.innerHeight/2)
	ctx[0].fillStyle = "rgb(80, 70, 50)"
	ctx[0].fillRect(0,window.innerHeight/2,window.innerWidth,window.innerHeight/2)
}

function Monster(lv,id){
	var t = this;
	this.id = id;
	this.atkImg = new Image();
	this.deadImg = new Image();
	this.atkloaded = false;
	this.deadloaded = false;
	this.atkImg.addEventListener("load",function(){
		t.atkloaded = true;
		console.log("loaded")
	},false)
	this.atkImg.addEventListener("load",function(){
		t.deadloaded = true;
		console.log("loaded")
	},false)
	// console.log(arguments,id%5)
	this.atkImg.src = monsterAssets[lv][id%5] + "/attack.png"
	this.deadImg.src = monsterAssets[lv][id%5] + "/dead.png";
	// console.log(this.atkImg.src = monsterAssets[lv][id%5]);
}


Monster.prototype.appear = function(){
	// animateSprite(this.atkImg,250,250,10)
	console.log(monstersSpriteArray.attack[this.id])
}

Monster.prototype.attack = function(){
	animateSprite("attack",id)
}

Monster.prototype.die = function(){
	animateSprite("dead",id)
}

//refered
//https://gamedevelopment.tutsplus.com/tutorials/an-introduction-to-spritesheet-animation--gamedev-13099
function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame) {
 
   var image = new Image();
   var framesPerRow;
 
   // calculate the number of frames in a row after the image loads
   var self = this;
   image.onload = function() {
      framesPerRow = Math.floor(image.width / frameWidth);
   };
 
   image.src = path;

  // code removed for brevity
 
  var currentFrame = 0;  // the current frame to draw
  var counter = 0;       // keep track of frame rate
 
  // Update the animation
  this.update = function() {
 
    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % endFrame;
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
  }
    // Draw the current frame
  this.draw = function(x, y) {
      // get the row and col of the frame
      var row = Math.floor(currentFrame / framesPerRow);
      var col = Math.floor(currentFrame % framesPerRow);

      // ctx[2].fillStyle="blue"
      // ctx[2].fillRect(0,0,50,50);
      ctx[2].drawImage(
         image,
         col * frameWidth, row * frameHeight,
         frameWidth, frameHeight,
         (window.innerWidth/2)-(frameWidth/2), (window.innerHeight/2)-(frameHeight/2),
         frameWidth, frameHeight);
      // console.log((window.innerWidth/2)-(frameWidth/2), (window.innerHeight/2)-(frameHeight/2))
      // console.log("drew!")
  };


}
 


function animateSprite(mode,step) {
   requestAnimationFrame( function(){animateSprite(mode,step)} );
   // requestAnimationFrame(animateSprite)
   ctx[2].clearRect(0, 0, canvas1.width, canvas1.height);
 	// console.log(mode,step,monstersSpriteArray[mode][step])
   // monstersSpriteArray[animMode][animStep].update();
   // monstersSpriteArray[animMode][animStep].draw();
    monstersSpriteArray[mode][step].update();
    monstersSpriteArray[mode][step].draw();
   // spritesheet.draw(0, 0);
}

window.onresize = function(){
	drawBackground();
		for(var i = scenesAmount-1; i >= 0; i--){
			scenes[i].draw(i);
		}
		// monstersArray[currentLevelNum].appear();
		// monstersArray[0].appear();
		// monstersSpriteArray[currentLevelNum].attack.
		if(initScreenSize){
			currentLevelImageSize = scenes[0].imageSize.height();
		}
}