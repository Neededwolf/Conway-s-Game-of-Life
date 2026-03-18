let gridSize = 20;
let grid;
let cellSize;
let running = false;
let delta = 0;
function createGrid() {
	let arr = [];
	for (let i = 0; i < gridSize; i++) {
		arr.push([]);
		for (let j = 0; j < gridSize; j++) {
			arr[i][j] = 0;
		}
	}
	return arr;
}

function visualGrid() {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			stroke(255);
			line(i*cellSize, 0, i*cellSize, height);
			line(0, j*cellSize, width, j*cellSize);

			noStroke(0);
			fill(255*grid[i][j])
			rect(i*cellSize, j*cellSize, cellSize, cellSize);
		}
	}
}

function countNeighbours(x, y) {
	let count = 0;

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {

			if (i === 0 && j === 0) continue;

			let nx = x + i;
			let ny = y + j;

			if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
				if (grid[nx][ny] === 1) count++;
			}
		}
	}

	return count;
}

function conway() {
	let newGrid = createGrid(gridSize);
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			let count = countNeighbours(i, j);
			if (grid[i][j] == 1) {
				if (count < 2) {
					continue;
				}
				if (count == 2 || count == 3) {
					newGrid[i][j] = 1;
				}
				if (count > 3) {
					continue;
				}
			}
			else if (grid[i][j] == 0) {
				if (count == 3) {
					newGrid[i][j] = 1;
				}
			}
		}
	}
	grid = newGrid;
}

function setup() {
	createCanvas(800, 800);
	grid = createGrid();
	cellSize = Math.floor(width/gridSize);
	console.log(grid);
}

function draw() {
	background(40);
	visualGrid();

	if (running && delta > 2) {
		conway();
		delta = 0;
	}
	delta += 1 ;
}


function mousePressed() {
	let x = Math.floor(mouseX / cellSize);
	let y = Math.floor(mouseY / cellSize);
	grid[x][y] = 1;
}

function mouseDragged() {
	let x = Math.floor(mouseX / cellSize);
	let y = Math.floor(mouseY / cellSize);
	grid[x][y] = 1;
}

function keyPressed() {
	if (key === 'p' || key === 'P') {
		running = !running;

	}
}

