// CONSTANTS
var COLS = 15, // EACH CELL ARE 60 PX
	ROWS = 15;
// OBJECT INDEX
var EMPTY = 0,
	PLAYER = 1,
	WALL = 2,
	BOMB = 3,
	BOMBLINE = 4;
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var grid = {
	width: null,
	height: null,
	_grid: null,

	init: function(dir, col, row) {
		this.width = col;
		this.height = row;
		this._grid = [];

		for (var i = 0; i < col; i++) {
			this._grid.push([]);
			for (var j = 0; j < row; j++) {
				this._grid[i].push(dir);
			}
		}
	},

	set: function(x, y, val) {
		this._grid[x][y] = val;
	},
	get: function(x, y) {
		return this._grid[x][y];
	}
};
// This is already OK

var player = {

	init: function() {
		/* body... */
	},
	move: function() {
		/* body... */
	},
	setBomb: function() {
		/* body... */ //Later
	}
};
var bomb = {
	//Later
};


/*	
 *GAME Objects
 */
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	keystate, frames, score, paused;

// Some nonsense function about pause and unpause and pressing key

function pause(argument) {
	if (!paused) {
		document.removeEventListener('keydown', pressKey);
		paused = true;
	} else {
		paused = false;
		document.addEventListener('keydown', pressKey);
		loop();
	}
}

function pressKey(evt) {
	keystate[evt.keyCode] = true;
}

function pauseKey(evt) {
	if (evt.keyCode == 80) {
		pause();
	}
}

//End of those

function main() {
	paused = false;
	canvas = document.getElementById("canvas");
	canvas.width = 30* COLS;
	canvas.height = 30* ROWS;
	ctx = canvas.getContext("2d");

	frames = 0;
	keystate = {};

	document.addEventListener('keydown', pressKey);
	document.addEventListener('keyup', function(evt) {
		delete keystate[evt.keyCode];
	});

	init();
	loop();
	document.addEventListener('keydown', pauseKey);

}



function init() {
	grid.init(EMPTY, COLS, ROWS);
	grid.set(0, 0, PLAYER);
}

function endGame() {
	// body...  
}

function update() {
	// body...  
}

function loop() {
	update();
	draw();
	if (!paused) {
		requestAnimationFrame(loop, canvas);
	}
}

function draw() {
	var tw = canvas.width / grid.width,
		th = canvas.height / grid.height;
	for (var i = 0; i < grid.width; i++) {
		for (var j = 0; j < grid.height; j++) {
			switch (grid.get(i, j)) {
				case EMPTY:
					ctx.fillStyle = '#2A9103'; //draw sprite
					break;
				case PLAYER:
					ctx.fillStyle = 'blue'; // draw sprite
					break;
				case WALL:
					ctx.fillStyle = 'black'; //draw sprite
					break;
				case BOMB:
					ctx.fillStyle = 'red'; //draw sprite
					break;
				case BOMBLINE:
					ctx.fillStyle = 'red'; //draw sprite
					break;
			}
			ctx.fillRect(i * tw, j * th, tw, th);
		}
	}
}


main();