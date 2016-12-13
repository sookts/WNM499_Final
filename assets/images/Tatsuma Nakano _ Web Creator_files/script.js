


//same width and height
// http://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout

window.onload = function(){
	initGallery()

	homeInitialAnimation()
	//this section was not working with jQuery for some reason
	document.getElementById("menuDecoration").width = window.innerWidth
	document.getElementById("menuDecoration").height = 300
}


window.onresize = function(){
	$(".content").each(function(){
		$(this).css({
			"height": $(this).width() + "px"
		})
	})
}

$(".content").click(function(event) {
	$(this).animate({
		"width": "100%",
		"height": window.innerHeight + "px"},
		1000, function() {
		/* stuff to do after animation is complete */
	});
});

$(".clickMenuItem").click(function() {
	// $("#menuDecoration").animate({
	// 	"right": window.innerWidth + "px",
	// 	},
	// 1000);
	// $(".clickMenuItem").animate({
	// 	"opacity": 0
	// 	},
	// 200);
	// $("#role").animate({
	// 	"opacity": 0},
	// 400);
	// $("#name").animate({
	// 	"opacity": 0},
	// 400);
});

function initGallery(){
	$(".content").each(function(){
		$(this).css({
			"height": $(this).width() + "px"
		})
	})
}

function homeInitialAnimation(){
	var amountOfNavContent = $("#mainNav > ul > li").length
	// console.log($("#mainNav > ul > li"))
	$("#mainNav").css({
		"right":"0px"
	})
	$("#name").animate({
		"opacity":"1"
	},800)
	$("#role").animate({
		"opacity":"1"
	},1200)
	$("#mainNav > ul").animate({
		"opacity":"1", //hard coded...
	},1000)
}


