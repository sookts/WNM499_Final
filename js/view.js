
var treeArray = [];
var treeImageArray = [];
var treeImageAssets = ["../assets/images/tree.png","../assets/images/tree.png","../assets/images/tree.png","../assets/images/tree.png","../assets/images/tree.png"]


window.onload = function () {
    ctx = document.getElementById('canvas').getContext('2d');
    
    for(var i = 0; i < 5; i++){
      treeImageArray[i] = new Image()
      treeImageArray[i].src = treeImageAssets[i];
      console.log("preload")
    }

    for(var i = 0; i < 5; i++){
      treeArray.push(new Tree(treeImageArray[i],i/2))
      treeArray[i].setup();
      console.log("setup")
    }

    for(var i = 0; i < 5; i++){
      treeArray[i].draw();
      console.log("draw")
    }
    
}//Close window event listener


function Tree(img,zoomLevel){
  this.img = img;
  this.zoomLevel = zoomLevel
  this.img.naturalWidth;
  this.img.naturalHeight;
  this.img.scaleMultiplier;
  this.img.width;
  this.img.height;
  this.imgFullScreenH
  // this.img.src = imgURL;
}

Tree.prototype.setup = function(){
  this.img.addEventListener("load", function(){
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
  }.bind(this),false)
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
        
    ctx.drawImage(this.img,-this.translate.x, -this.translate.y,this.img.width, this.img.height);
        
	}.bind(this),false)

}

function reset() {
  location.reload();
}