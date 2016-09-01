// CONSTANTS
var COLS = 20, // EACH CELL ARE 30 PX
	ROWS = 20;
// OBJECT INDEX
var EMPTY = 0,
	PLAYER = 1,
	WALL = 2,
	BOMB = 3,
	BOMBLINE = 4;
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
// Key codes:
var LEFT = 37,
	UP = 38,
	RIGHT = 39,
	DOWN = 40;



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
		this._grid = [this._grid, this._grid];
	},

	set: function(layer, x, y, val) {
		this._grid[layer][x][y] = val;
	},
	get: function(layer, x, y) {
		return this._grid[layer][x][y];
	}
};
// This is already OK

var player = {
	x: null,
	y: null,

	init: function() {
		this.x = 0;
		this.y = 0;
	},
	move: function(direction) {
		switch (direction) {
			case UP:
				if (this.y === 0) {
					break;
				}
				grid.set(1, this.x, this.y, EMPTY);
				this.y--;
				grid.set(1, this.x, this.y, PLAYER);
				break;
			case DOWN:
				if (this.y === grid.height - 1) {
					break;
				}
				grid.set(1, this.x, this.y, EMPTY);
				this.y++;
				grid.set(1, this.x, this.y, PLAYER);
				break;
			case RIGHT:
				if (this.x === grid.width - 1) {
					break;
				}
				grid.set(1, this.x, this.y, EMPTY);
				this.x++;
				grid.set(1, this.x, this.y, PLAYER);
				break;
			case LEFT:
				if (this.x === 0) {
					break;
				}
				grid.set(1, this.x, this.y, EMPTY);
				this.x--;
				grid.set(1, this.x, this.y, PLAYER);
				break;
		}
	},
	setBomb: function() {
		/* body... */ //Later
	}
};

function Bomb(argument) {
	// body...
}


/*	
 *GAME Objects
 */
var dir, keystate, frames, score, paused;

// Some functions about pause and unpause and pressing key

function pause() {
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
	player.move(evt.keyCode);
}

function pauseKey(evt) {
	if (evt.keyCode == 80) {
		pause();
	}
}

//End of those

function main() {
	player.init();
	paused = false;
	canvas = document.getElementById("canvas");
	canvas.width = 30 * COLS; //30px each cell
	canvas.height = 30 * ROWS; //30px each cell
	ctx = canvas.getContext("2d");

	frames = 0;

	document.addEventListener('keydown', pressKey);

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
					//ctx.drawImage()
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
