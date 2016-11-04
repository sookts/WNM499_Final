

window.onload = function () {
    var treeArray = [];
 
    ctx = document.getElementById('canvas').getContext('2d');
    for(var i = 0; i < 5; i++){
      treeArray.push(new Tree("../assets/images/tree.png",i*100,i*100))
      treeArray[i].draw();
    }
}//Close window event listener

function Tree(imgURL,imgWidth,imgHeight){
  this.img = new Image;
  this.img.width = imgWidth;
  this.img.height = imgHeight;
  this.img.src = imgURL;
  this.translate  = {
    x : (window.innerWidth - this.img.width)/2,
    y : (window.innerHeight - this.img.height)/2
  }
}

Tree.prototype.draw = function(){
	this.img.addEventListener("load", function(){
	    	ctx.drawImage(this.img,0, 0);
	    }, false)
}

function reset() {
  location.reload();
}