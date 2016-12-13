var particle;
var rowAmout = 3
var step = 4
var count = 1;
var row = 10


$(".clickMenuItem").click(function(){
	$("#menuTitle").text($(this).text())
	$("#menuDecoration").animate({
		"right": 0 + "px",
		},
	1000,function(){
		labelAnimation()
	});
	ctx = document.getElementById('menuDecoration').getContext('2d');
	// draw()
})

function labelAnimation(){

	$("#menuTitle").css({
		"display":"block"
	})

	$("#menuTitle").animate({
		"opacity":"1"
	},800,function(){
		$("#menuTitle").animate({
		"opacity":"0"
		},800)
	})
}

function draw(){
	
	menuDecoH = $("#menuDecoration").height()
	size = step
	for(var i = 0; i <= menuDecoH/step; i++){
		for(var j = 0; j < count; j++){
			color = {
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255)
			}
			randomJump = Math.floor(Math.random()*2)
			
			ctx.fillStyle = "rgb("+color.r+","+color.g+","+color.b+")";
			ctx.fillRect(j*(step*j),i*step,size,size)
		}
	}
	if(count < row){
		count++;
		setInterval(draw,200)
	}
}
