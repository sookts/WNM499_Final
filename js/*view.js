
var treeArray = [];
var treeImageArray = [];
var treeImageAssets = [
  "../assets/images/tree.png",
  "../assets/images/tree.png",
  "../assets/images/tree.png",
  "../assets/images/tree.png",
  "../assets/images/tree.png"
]


window.onload = function () {
    ctx = document.getElementById('canvas').getContext('2d');
    
    // for(var i = 0; i < 5; i++){
    //   console.log("preload")
    // }

    for(var i = 0; i < 5; i++){
      treeArray.push(new Tree(i))
      // treeArray[i].setup();
      // console.log("setup")
    }

    // for(var i = 0; i < 5; i++){
    //   treeArray[i].draw();
    //   console.log("draw")
    // }
    
    initDraw();
}//Close window event listener


function Tree(id){
  var t = this;
  this.img = new Image();
  this.zoomLevel = id/2;
  this.imgFullScreenH;
  this.loaded = false;
  console.log(this.img)
  this.img.addEventListener("load",function(){
    t.loaded = true;
    t.setup();
  },false)
  this.img.src = treeImageAssets[id];
}

Tree.prototype.setup = function(){
  
  this.img.zoomScaleMultiplier = (this.zoomLevel * 0.9)
  this.img.scaleMultiplier = (window.innerHeight / this.img.naturalHeight);
  // this.img.height = window.innerHeight * (-this.zoomLevel);
  // this.img.width = this.img.naturalWidth*this.img.scaleMultiplier * (-this.zoomLevel);
  this.img.height = window.innerHeight * this.img.zoomScaleMultiplier;
  this.img.width = this.img.naturalWidth * this.img.scaleMultiplier  * this.img.zoomScaleMultiplier;
  this.translate  = {
    x : (this.img.width - window.innerWidth)/2,
    y : (this.img.height - window.innerHeight)/1.2,
  }
}

Tree.prototype.draw = function(){
	this.img.addEventListener("load", function(){

        
        // console.group("sizes")
        //   console.log("this.img.scaleMultiplier",this.img.scaleMultiplier)
        //   console.log("this.img.width",this.img.width)
        //   console.log("this.img.height",this.img.height)
        //   console.log("this.img.naturalWidth",this.img.naturalWidth)
        //   console.log("this.img.naturalHeight",this.img.naturalHeight)
        // console.groupEnd()
        
        
	}.bind(this),false)

}

function initDraw(){
  var ready = 0; 
  for(var i in treeArray){
    if(treeArray[i].loaded) ready++;
  }
  if(ready==treeArray.length) {
    console.log("success")
    for(i in treeArray){
      ctx.drawImage(
        treeArray[i].img,
        -treeArray[i].translate.x,
        -treeArray[i].translate.y,
        treeArray[i].img.width,
        treeArray[i].img.height
      );
    }
  } else {
    console.log("not yet")
    setTimeout(initDraw,50);
  }
}

function reset() {
  location.reload();
}