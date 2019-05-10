

var numOfBoxs = 100;
var gridSize = 10;
var gameWidth = gridSize * numOfBoxs;
var gameHeight = gridSize * numOfBoxs;

var grid;
var ant;



// var testArr = [1, 2, 3, 4, 5];
//
// console.log(testArr[-1 % testArr.length]);







function setup(){
	createCanvas(gameWidth, gameHeight);
	ellipseMode(CORNER);
	frameRate(3000);
	grid = new Grid(numOfBoxs, gridSize);
	ant = new Ant(numOfBoxs / 2, numOfBoxs / 2, gridSize);
}


function update(){

	grid.update();
	ant.update();
}


function draw(){

	background(51);
	grid.draw();
	ant.draw();
	update();
}



class Grid{

	constructor(numOfBoxs, gridSize){
		this.arr = [];

		for (var r = 0; r < numOfBoxs; r++) {
			for (var c = 0; c < numOfBoxs; c++) {
				var color = "light";
				// var rdm = Math.floor(Math.random() * (2 - 0)) + 0;
				//
				// rdm === 0 ? color = "light" : color = "dark";

				this.arr.push(new Box(color, r, c, gridSize));

			}
		}
	}

	update(){
		for (var i = 0; i < this.arr.length; i++) {
			this.arr[i].update();
		}
	}

	draw(){
		for (var i = 0; i < this.arr.length; i++) {
			this.arr[i].draw();
		}
	}

	getBoxColor(x, y){
		for (var i = 0; i < this.arr.length; i++) {
			var ax = this.arr[i].x;
			var ay = this.arr[i].y;

			if(ax === x && ay === y){
				return this.arr[i].getColor();

			}
		}
	}

	changeBoxColor(x, y, color){
		for (var i = 0; i < this.arr.length; i++) {
			var ax = this.arr[i].x;
			var ay = this.arr[i].y;

			if(ax === x && ay === y){
				this.arr[i].setColor(color);

			}
		}
	}
}



class Box{

	constructor(color, x, y, size){
		this.color = color;
		this.x = x;
		this.y = y;
		this.size = size;
	}

	update(){


	}

	draw(){
		push();
		translate(this.x * this.size, this.y * this.size);
		//stroke(255);
		noStroke();
		this.color === "light" ? fill(200, 200, 200) : fill(100, 100, 100);
		rect(this.x, this.y, this.size, this.size);
		pop();
	}




	getColor(){
		return this.color;
	}

	setColor(c){
		this.color = c;
	}
}

class Ant{

	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size;
		this.dir = "N";
		this.dirArr = ["N", "E", "S", "W"];
	}

	update(){
		//check current getColor
		var c = grid.getBoxColor(this.x, this.y);
		//make left or right decsion

		if(c === "light"){
			var currentPos = this.dirArr.indexOf(this.dir);
			this.dir = this.dirArr[(currentPos + 1) % this.dirArr.length];
			grid.changeBoxColor(this.x, this.y, "dark");
			this.move();
		}

		else{
			var currentPos = this.dirArr.indexOf(this.dir);
			if(currentPos === 0){
				this.dir = this.dirArr[this.dirArr.length - 1];
			}
			else{
				this.dir = this.dirArr[(currentPos - 1) % this.dirArr.length];
			}
			grid.changeBoxColor(this.x, this.y, "light");
			this.move();
		}
		//change getColor


		//move
	}

	move(){
		switch(this.dir){
			case "N":
				this.y--;
				break;

			case "E":
				this.x++;
				break;

			case "S":
				this.y++;
				break;

			case "W":
				this.x--;
				break;
		}
	}

	draw(){
		push();
		translate(this.x * this.size, this.y * this.size);
		fill(0, 0, 255);
		ellipse(this.x, this.y, this.size, this.size);
		pop();
	}
}
