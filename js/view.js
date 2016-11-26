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
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg"
	],
	[
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg"
	],
	[
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg",
		"../assets/images/monsters/easy/monster.svg"
	]
]



window.onload = function(){
	ctx = document.getElementById('canvas').getContext('2d');

	// console.log(allTrees)

	for(var i = 0; i < scenesAmount; i++){
		var level = Math.floor(i/5)
		scenes.push( new OneScene(level,i+1))
		monstersArray.push( new Monster(level,i))
	}

	for(var s = 0; s < scenes.length; s++){
		allMonstersImageAssetsCount++;
		for(var at = 0; at < scenes[s].allTrees.length; at++){
			for(var t = 0; t < scenes[s].allTrees[at].length; t++){
				allTreeImageAssetsCount++;
			}
		}
	}


	initDraw()
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
	var readyForTree = 0
	var readyForMonster = 0
	for(var s in scenes){
		// console.log(s/5,s%5,monstersArray[s/5],monstersArray[s/5][s%5])
		if(monstersArray[s].loaded)readyForMonster++;
		for(var at in scenes[s].allTrees){
			// console.log(readyForMonster)
			// console.log(allMonstersImageAssetsCount)
			for(var t in scenes[s].allTrees[at]){
				if(scenes[s].allTrees[at][t].loaded) readyForTree++;
			}
		}
	}

	console.log(readyForTree,allTreeImageAssetsCount,readyForMonster,allMonstersImageAssetsCount)
	if(readyForTree==allTreeImageAssetsCount && readyForMonster == allMonstersImageAssetsCount) {
		console.log("success")
		drawBackground();
		for(var i = scenesAmount-1; i >= 0; i--){
			scenes[i].draw(i);
		}
		// monstersArray[0].appear();
		if(initScreenSize){
			currentLevelImageSize = scenes[0].imageSize.height();
			console.log(currentLevelImageSize)
			initScreenSize = false;
		}
	}else{
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


OneScene.prototype.draw = function(z){
	var layerAmount = 1;
	var treeAmountForOneSide = 15
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
			
			
			this.leftTreeImageArray[i].push(this.allTrees[this.level][Math.floor(random(this.allTrees[this.level].length))].img);
			this.rightTreeImageArray[i].push(this.allTrees[this.level][Math.floor(random(this.allTrees[this.level].length))].img);
			
			this.ratioHtoW = {
				left: this.leftTreeImageArray[i][j].width/this.leftTreeImageArray[i][j].height,
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
				ctx.drawImage(
					this.leftTreeImageArray[i][j],
					this.treePosition.x.left,
					this.treePosition.y,
					this.imageSize.width,
					this.imageSize.height()
				)

				ctx.drawImage(
					this.rightTreeImageArray[i][j],
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

function animate(){
	// console.log("step",step)
	console.group()
		console.log("currentStep",currentStep)
		console.log("scenes[currentStep + 1].imageSize.height()",scenes[currentStep + 1].imageSize.height())
		console.groupEnd()
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	forward = forward * 1.02
	drawBackground();
	for(var i = scenesAmount-1; i >= 0; i--){
		scenes[i].draw(i);
	}
	
	if(scenes[currentStep + 1].imageSize.height() >= currentLevelImageSize){
		// clearInterval(animation)
		currentStep++;
	}else{
		animation = setTimeout(animate,0)
	}
}

function drawBackground(){
	//ground
	ctx.rect(0,window.innerHeight/2,window.innerWidth,window.innerHeight/2)
	ctx.fillStyle = "rgb(80, 70, 50)"
	ctx.fillRect(0,window.innerHeight/2,window.innerWidth,window.innerHeight/2)
	//sky
	ctx.rect(0,0,window.innerWidth,window.innerHeight/2)
	ctx.fillStyle = "rgb(0, 100, 150)"
	ctx.fillRect(0,0,window.innerWidth,window.innerHeight/2)
}

function Monster(lv,id){
	var t = this;
	this.id = id;
	this.img = new Image();
	this.loaded = false;
	this.img.addEventListener("load",function(){
		t.loaded = true;
		console.log("loaded")
	},false)
	console.log(arguments,id%5)
	this.img.src = monsterAssets[lv][id%5];
}

// Monster.prototype.initDraw = function(){

// }

// Monster.prototype.standby = function(){

// }

Monster.prototype.appear = function(){
	this.height = 0;

	this.animation = function(){
		ctx.clearRect(
			(window.innerWidth/2) - (this.img.width/2),
			(window.innerHeight/1.5) - (this.img.height/2),
			this.img.width,
			this.height
			)
		ctx.drawImage(
			this.img,
			(window.innerWidth/2) - (this.img.width/2),
			(window.innerHeight/1.5) - (this.img.height/2),
			this.img.width,
			this.height
		)
		if(this.height == this.img.height){
			
			console.log("animation done")
		}else{
			setTimeout(this.animation(),3000)
			console.log("animating...")
		}
	}

	this.animation();
	
}

Monster.prototype.attack = function(){

}

Monster.prototype.die = function(){

}

