
var treeArray = [];


    

window.onload = function () {
    ctx = document.getElementById('canvas').getContext('2d');
    
    for(var i = 0; i < 10; i++){
      treeArray.push(new Tree("../assets/images/tree.png",i/2))
    }
    for(var i = 0; i < treeArray.length; i++){
      // ctx.globalCompositeOperation='destination-over';
      treeArray[i].draw();
    }

}//Close window event listener

function Tree(imgURL,zoomLevel){
  this.img = new Image();
  this.img.onload;
  this.zoomLevel = zoomLevel
  this.img.naturalWidth;
  this.img.naturalHeight;
  this.img.scaleMultiplier;
  this.img.width;
  this.img.height;
  this.imgFullScreenH
  this.img.src = imgURL;
}

Tree.prototype.draw = function(){
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

        console.group("sizes")
          console.log("this.img.scaleMultiplier",this.img.scaleMultiplier)
          console.log("this.img.width",this.img.width)
          console.log("this.img.height",this.img.height)
          console.log("this.img.naturalWidth",this.img.naturalWidth)
          console.log("this.img.naturalHeight",this.img.naturalHeight)
          console.log("this.img.onload",this.img.onload)
        console.groupEnd()
        
	    	ctx.drawImage(this.img,-this.translate.x, -this.translate.y,this.img.width, this.img.height);
        
	    }.bind(this),false)

/*

To get width and height of images, you need to write those codes into image Event Listener.

--------------------------------------------------------------------------------------------
"How can I control z-index of canvas objects?"
http://stackoverflow.com/questions/14250697/how-can-i-control-z-index-of-canvas-objects
--------------------------------------------------------------------------------------------


*/

}

function reset() {
  location.reload();
}