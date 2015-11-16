//Set Globals for Mouse Position
var mouseX = 0;
var mouseY = 0;
//'listen' for mouse movement
document.addEventListener('mousemove', getMousePosition, false);


//	Define the starfield class.
function Starfield() {
	this.fps = 30;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = 10;
	this.maxVelocity = 200;
	this.stars = 75;
	this.intervalId = 0;
}

//	The main function - initialises the starfield.
Starfield.prototype.initialise = function(div) {
	var self = this;

	//	Store the div.
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function() {

	//	Create the stars.
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update(mouseX,mouseY);
		self.draw();	
	}, 1000 / this.fps);
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Starfield.prototype.update = function(mouseX,mouseY) {
	var dt = 1 / this.fps;
	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		
		
		if(mouseY > 0){
			star.y += dt * star.velocity;
		}else {
			star.y -= dt * star.velocity;
		}
		
		if(mouseX > 0){
			star.x += dt * star.velocity;
		}else {
			star.x -= dt * star.velocity;
		}


		//	If the star has moved from the bottom of the screen, spawn it at the top.
		if(star.y > this.height) {
			this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
		//	If the star has moved from the top of the screen, spawn it at the bottom.
		if(star.y < 0) {
			this.stars[i] = new Star(Math.random()*this.width, this.height, Math.random()*3+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
		//if the star has moved past the right side of the screen, spawn at left side
		if(star.x < 0) {
			this.stars[i] = new Star(this.width, Math.random()*this.height, Math.random()*3+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
		//if the star has moved past the left side of the screen, spawn at right side
		if(star.x > this.width) {
			this.stars[i] = new Star(0, Math.random()*this.height, Math.random()*3+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}

	}
};

Starfield.prototype.draw = function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");

	//	Draw the background.
 	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);

	//	Draw stars.
	ctx.fillStyle = '#ffffff';
	for(var i=0; i<this.stars.length;i++) {
		var star = this.stars[i];
		// Make them twinkle and change colors
		ctx.fillStyle = "rgb("+
		  Math.floor(Math.random()*256)+","+
		  Math.floor(Math.random()*256)+","+
		  Math.floor(Math.random()*256)+")";
		ctx.fillRect(star.x, star.y, star.size, star.size);

	}
};

function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.size = size;
	this.velocity = velocity;
}



function getMousePosition(e){
	var parent = document.getElementById('container');
	var element = parent.getElementsByTagName('canvas')[0];
	
	mouseX = e.pageX - (element.width /2);
    mouseY = e.pageY - (element.height /2);


}
